import React, { useContext, useEffect, useReducer, useState } from 'react'

import {
	XYPlot,
	LineSeries,
	MarkSeries,
	Hint,
	HorizontalGridLines,
	XAxis,
	YAxis,
} from 'react-vis'
import Context from './Context'

import {
	SeriesData,
	ContextStateType,
	Game,
} from './types'

interface Props {
	seriesIdx: number
}

enum DataSetEnum {
	SET_PARSED_DATA = 'SET_PARSED_DATA',
	SET_SALES_DATA = 'SET_SALES_DATA',
	SET_DAILY_EXPECTED_DATA = 'SET_DAILY_EXPECTED_DATA',
	SET_CUMULATIVE_EXPECTED_DATA = 'SET_CUMULATIVE_EXPECTED_DATA',
}

interface OneSeriesPoint {
	label: string
	y: number,
	x: number
}

interface DataSetState {
	parsedData: OneSeriesPoint[]
	salesData: OneSeriesPoint[]
	dailyExpectedData: OneSeriesPoint[]
	cumulativeExpectedData: OneSeriesPoint[]
}

interface DataSetAction { 
	type: DataSetEnum, 
	payload: any 
}

const dataSetInitialState: DataSetState = {
	parsedData: [],
	salesData: [],
	dailyExpectedData: [],
	cumulativeExpectedData: []
}

function dataSetReducer (state: DataSetState, action: DataSetAction): DataSetState {
	switch (action.type) {
		case DataSetEnum.SET_PARSED_DATA:
			return {
				...state,
				parsedData: action.payload
			}
		case DataSetEnum.SET_SALES_DATA:
			return {
				...state,
				salesData: action.payload
			}
		case DataSetEnum.SET_DAILY_EXPECTED_DATA:
			return {
				...state,
				dailyExpectedData: action.payload
			}
		case DataSetEnum.SET_CUMULATIVE_EXPECTED_DATA:
			return {
				...state,
				cumulativeExpectedData: action.payload
			}
		default:
			return state
	}
}

const GraphOneSeries: React.FC<Props> = ({
	seriesIdx,
}) => {
	const WIDTH = 1000
	const HEIGHT = 400
	const STEP = 3

	// swap out for a controler later
	const INCLUDE_CD = false
	const SHOW_SALES = false
	const SHOW_DAILY_EXPECTED = false
	const SHOW_CUMULATIVE_EXPECTED = true

	const [dataSets, dispatch] = useReducer(dataSetReducer, dataSetInitialState)
	const [hintValue, setHintValue]: [OneSeriesPoint | null, any] = useState(null)
	const { state }: { state: ContextStateType } = useContext(Context)
	const { games, days } = state
	const series = state.series[seriesIdx]
	const { data, gameId } = series
	const game = games.find((game: Game) => game.id === gameId)

	useEffect(() => {
		const parsedData: OneSeriesPoint[] = data.reduce((acc: any, each: SeriesData, dayIdx: number) => {
			let cd = false
			if (each.add && each.add !== 0) cd = true
			const add = Number(each.add)
			if (cd && INCLUDE_CD) {
				return [
					...acc, 
					createOneSeriesPoint(each, dayIdx, 'am', 'Count: '),  
					point(days[dayIdx], 'change demand', each.am + add, (dayIdx * STEP) + 1),
					createOneSeriesPoint(each, dayIdx, 'pm', 'Count: ')
				]
			} else {
				return [
					...acc, 
					createOneSeriesPoint(each, dayIdx, 'am', 'Count: '),
					createOneSeriesPoint(each, dayIdx, 'pm', 'Count: ')
				]
			}
		}, [])
		dispatch({
			type: DataSetEnum.SET_PARSED_DATA,
			payload: parsedData
		})
		
		// eslint-disable-next-line
	}, [data, days, INCLUDE_CD])

	useEffect(() => {
		const salesData: OneSeriesPoint[] = data.reduce((acc: OneSeriesPoint[], each: SeriesData, dayIdx: number) => {
			const price = game ? game.price : 1
			return [
				...acc,
				point(days[dayIdx], 'pm sales', each.sales / price, (dayIdx * STEP) + 2)
			]
		}, [])
		dispatch({
			type: DataSetEnum.SET_SALES_DATA,
			payload: salesData
		})
	}, [data, days, game])

	useEffect(() => {
		const dailyExpectedData: OneSeriesPoint[] = data.reduce((acc: OneSeriesPoint[], each: SeriesData, dayIdx: number) => {
			const price = game ? game.price : 1
			const numberOfSales = each.sales / price
			return [
				...acc, 
				point(days[dayIdx], 'am', each.am, (dayIdx * STEP), 'Expected Number: '),
				point(days[dayIdx], 'pm', each.am + Number(each.add) - numberOfSales, (dayIdx * STEP) + 2, 'Expected Number: '),
			]
		}, [])
		dispatch({
			type: DataSetEnum.SET_DAILY_EXPECTED_DATA,
			payload: dailyExpectedData
		})
	}, [data, days, game])

	useEffect(() => {
		const price = game ? game.price : 1
		let prevDay: SeriesData = data[0]
		const cumulativeExpectedData = []
		for (let dayIdx = 0; dayIdx < data.length; dayIdx++) {
			if (dayIdx === 0) {
				const numberOfSales = data[0].sales / price
				cumulativeExpectedData.push(point(days[dayIdx], 'am', data[0].am, (dayIdx * STEP), 'Expected Number: '))
				cumulativeExpectedData.push(point(days[dayIdx], 'pm', data[0].am + Number(data[0].add) - numberOfSales, (dayIdx * STEP) + 2, 'Expected Number: '))
			} else {
				const today = data[dayIdx]
				const numberOfSales = today.sales / price
				cumulativeExpectedData.push(point(days[dayIdx], 'am', prevDay.pm, (dayIdx * STEP), 'Expected Number: '))
				cumulativeExpectedData.push(point(days[dayIdx], 'pm', prevDay.pm + Number(today.add) - numberOfSales, (dayIdx * STEP) + 2, 'Expected Number: '))
				prevDay = { ...today, am: prevDay.pm, pm: prevDay.pm + Number(today.add) - numberOfSales }
			}
		}
		console.log(cumulativeExpectedData)
		dispatch({
			type: DataSetEnum.SET_CUMULATIVE_EXPECTED_DATA,
			payload: cumulativeExpectedData
		})
	}, [data, days, game])


	function createOneSeriesPoint (dataPoint: SeriesData, dayIdx: number, time: 'am' | 'pm', contextLabel?: string): OneSeriesPoint {
		const offset = time === 'am' ? 0 : 2
		return point(days[dayIdx], time, dataPoint[time], (dayIdx * STEP) + offset, contextLabel)
	}

	function point (day: string, time: 'am' | 'pm' | 'change demand' | 'pm sales', value: number, x: number, contextLabel?: string) {
		return { 
			label: `${contextLabel || ''} ${day} ${time}`.trim(),
			y: value,
			// @ts-ignore
			x
		}
	}

	const handleMarkMouseOver = (e: any) => {
		setHintValue(e)
	}

	const handleMouseLeave = () => setHintValue(null)

	if (dataSets.parsedData.length === 0) {
		return (
			<div>
				NO DATA
			</div>
		)
	}

	return (
		<div
			style={{
				position: 'relative'
			}}
		>
			<h3>
				{
					game ? `${game.number} - ${game.name}` : ''	
				}
			</h3>
			<XYPlot
				width={WIDTH}
				height={HEIGHT}
				onMouseLeave={handleMouseLeave}
				style={{
					// position: 'relative'
				}}
			>
				<HorizontalGridLines />
				<XAxis />
				<YAxis />
				{
					SHOW_DAILY_EXPECTED && 
					<LineSeries 
						data={dataSets.dailyExpectedData}
					/>
				}
				{
					SHOW_CUMULATIVE_EXPECTED &&
					<LineSeries 
						data={dataSets.cumulativeExpectedData}
					/>
				}
				{ 
					SHOW_SALES && 
					<LineSeries 
						data={dataSets.salesData}
					/>
				}
				<LineSeries 
					data={dataSets.parsedData}
				/>
				{
					SHOW_DAILY_EXPECTED &&
					<MarkSeries 
						data={dataSets.dailyExpectedData}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				{
					SHOW_CUMULATIVE_EXPECTED &&
					<MarkSeries 
						data={dataSets.cumulativeExpectedData}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				{ 
					SHOW_SALES && 
					<MarkSeries 
						data={dataSets.salesData}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				<MarkSeries 
					data={dataSets.parsedData}
					onValueMouseOver={handleMarkMouseOver}
				/>
				{
					(hintValue !== null) && 
					<Hint 
						value={hintValue} 
					/>
				}
			</XYPlot>
		</div>
	)
}

export default GraphOneSeries