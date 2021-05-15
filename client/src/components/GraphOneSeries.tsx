/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React, { 
	CSSProperties, 
	useContext, 
	useEffect,
	useReducer, 
	useState 
} from 'react'

import {
	XYPlot,
	LineSeries,
	MarkSeries,
	Hint,
	HorizontalGridLines,
	XAxis,
	YAxis,
	Crosshair,
} from 'react-vis'


import { crosshairPositionSet, crosshairReset } from './Actions'
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
	SET_DAILY_DISCREPANCY_DATA = 'SET_DAILY_DISCREPANCY_DATA',
	SET_CUMULATIVE_DISCREPANCY_DATA = 'SET_CUMULATIVE_DISCREPANCY_DATA',
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
	dailyDiscrepancyData: OneSeriesPoint[]
	cumulativeDiscrepancyData: OneSeriesPoint[]
}

interface DataSetAction { 
	type: DataSetEnum, 
	payload: any 
}

const dataSetInitialState: DataSetState = {
	parsedData: [],
	salesData: [],
	dailyExpectedData: [],
	cumulativeExpectedData: [],
	dailyDiscrepancyData: [],
	cumulativeDiscrepancyData: [],
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
		case DataSetEnum.SET_DAILY_DISCREPANCY_DATA:
			return {
				...state,
				dailyDiscrepancyData: action.payload
			}
		case DataSetEnum.SET_CUMULATIVE_DISCREPANCY_DATA:
			return {
				...state,
				cumulativeDiscrepancyData: action.payload
			}
		default:
			return state
	}
}

interface CrosshairValue {
	count?: OneSeriesPoint
	sales?: OneSeriesPoint
	dailyExpected?: OneSeriesPoint
	dailyDiscrepancy?: OneSeriesPoint
	cumulativeExpected?: OneSeriesPoint
	cumulativeDiscrepancy?: OneSeriesPoint
}

const GraphOneSeries: React.FC<Props> = ({
	seriesIdx,
}) => {
	const WIDTH = 1000
	const HEIGHT = 400
	const STEP = 3

	// swap out for a controler later
	const INCLUDE_CD = false

	const [dataSets, localDispatch]: [DataSetState, any] = useReducer(dataSetReducer, dataSetInitialState)
	const [hintValue, setHintValue]: [OneSeriesPoint | null, any] = useState(null)
	const [crosshairValue, setCrosshairValue]: [CrosshairValue | null, any] = useState(null)
	const { state, dispatch }: { state: ContextStateType, dispatch: any } = useContext(Context)

	const { ui: { seriesActive, selectedColours, crosshairPosition } } = state
	const { games, days } = state

	const series = state.series[seriesIdx]
	const { data, gameId } = series

	const game = games.find((game: Game) => game.id === gameId)
	const colours = selectedColours

	const SHOW_SALES = seriesActive.sales
	const SHOW_COUNT = seriesActive.count
	const SHOW_DAILY_EXPECTED = seriesActive.dailyExpected
	const SHOW_DAILY_DISCREP = seriesActive.dailyDiscrepancy
	const SHOW_CUMULATIVE_EXPECTED = seriesActive.cumulativeExpected
	const SHOW_CUMULATIVE_DISCREP = seriesActive.cumulativeDiscrepancy

	const tooltip: CSSProperties = {
		textAlign: 'left',
		// background: '#ecf0f1',
		// color: '#333',
		fontSize: '12px',
		padding: '6px',
		borderRadius: '5px',
		pointerEvents: 'none',
		boxShadow: '5px 5px 5px rgba(0,0,0,.3)',
		background: '#3A3A48',
		margin: '5px',
		boxSizing: 'border-box',
	}

	// const tooltipStyle = css`
	// 	text-align: left;
	// 	font-size: 12px;
	// 	padding: 6px;
	// 	border-radius: 5px;
	// 	pointer-events: none;
	// 	box-shadow: 5px 5px 5px rgba(0,0,0,.3);
	// 	background: #3A3A48;
	// 	margin: 5px;
	// 	boxSizing: border-box;
	// `

const tooltipStyle = css({
		textAlign: 'left',
		// background: '#ecf0f1',
		// color: '#333',
		fontSize: '12px',
		padding: '6px',
		borderRadius: '5px',
		pointerEvents: 'none',
		boxShadow: '5px 5px 5px rgba(0,0,0,.3)',
		background: '#3A3A48',
		margin: '5px',
		boxSizing: 'border-box',
})

	// Count
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
		localDispatch({
			type: DataSetEnum.SET_PARSED_DATA,
			payload: parsedData
		})
		
		// eslint-disable-next-line
	}, [data, days, INCLUDE_CD])


	// Sales
	useEffect(() => {
		const salesData: OneSeriesPoint[] = data.reduce((acc: OneSeriesPoint[], each: SeriesData, dayIdx: number) => {
			const price = game ? game.price : 1
			return [
				...acc,
				point(days[dayIdx], 'pm sales', each.sales / price, (dayIdx * STEP) + 2)
			]
		}, [])
		localDispatch({
			type: DataSetEnum.SET_SALES_DATA,
			payload: salesData
		})
	}, [data, days, game])


	// Cumulative Expected
	useEffect(() => {

		const price: number = game ? game.price : 1
		let prevDay: SeriesData = data[0]
		const cumulativeExpectedData: OneSeriesPoint[] = []

		for (let dayIdx = 0; dayIdx < data.length; dayIdx++) {
			if (dayIdx === 0) {
				const today: SeriesData = data[0]
				const numberOfSales = today.sales / price
				const am = today.am
				const pm = today.am + Number(today.add) - numberOfSales
				cumulativeExpectedData.push(point(days[dayIdx], 'am', am, (dayIdx * STEP), 'Cumulative Expected Number: '))
				cumulativeExpectedData.push(point(days[dayIdx], 'pm', pm, (dayIdx * STEP) + 2, 'Cumulative Expected Number: '))
				prevDay = today
			} else {
				const today = data[dayIdx]
				const numberOfSales = today.sales / price
				const am = prevDay.pm
				const pm = prevDay.pm + Number(today.add) - numberOfSales
				cumulativeExpectedData.push(point(days[dayIdx], 'am', am, (dayIdx * STEP), 'Cumulative Expected Number: '))
				cumulativeExpectedData.push(point(days[dayIdx], 'pm', pm, (dayIdx * STEP) + 2, 'Cumulative Expected Number: '))
				prevDay = { ...today, am, pm }
			}
		}
		console.log(cumulativeExpectedData)
		localDispatch({
			type: DataSetEnum.SET_CUMULATIVE_EXPECTED_DATA,
			payload: cumulativeExpectedData
		})
	}, [data, days, game])


	// Daily Expected
	useEffect(() => {

		const dailyExpectedData: OneSeriesPoint[] = []
		let prevDay: SeriesData = data[0]

		for (let dayIdx = 0; dayIdx < data.length; dayIdx ++) {
			const today: SeriesData = data[dayIdx]
			const price = game ? game.price : 1
			const numberOfSales = today.sales / price

			if (dayIdx === 0) {
				dailyExpectedData.push(point(days[dayIdx], 'am', today.am, (dayIdx * STEP), 'Daily Expected Number: '))
				dailyExpectedData.push(point(days[dayIdx], 'pm', today.am + Number(today.add) - numberOfSales, (dayIdx * STEP) + 2, 'Daily Expected Number: '))
			} else {
				dailyExpectedData.push(point(days[dayIdx], 'am', prevDay.pm, (dayIdx * STEP), 'Daily Expected Number: '))
				dailyExpectedData.push(point(days[dayIdx], 'pm', prevDay.pm + Number(today.add) - numberOfSales, (dayIdx * STEP) + 2, 'Daily Expected Number: '))
				prevDay = today
			}
		}

		localDispatch({
			type: DataSetEnum.SET_DAILY_EXPECTED_DATA,
			payload: dailyExpectedData
		})
	}, [data, days, game])


	// Daily Discrepancy
	useEffect(() => {

		const dailyDiscrepancyData: OneSeriesPoint[] = []
		let prevDay: SeriesData = data[0]

		for (let dayIdx = 0; dayIdx < data.length; dayIdx ++) {
			const today: SeriesData = data[dayIdx]
			const price: number = game ? game.price : 1
			const numberOfSales: number = today.sales / price

			if (dayIdx === 0) {
				dailyDiscrepancyData.push(point(days[dayIdx], 'am', 0, (dayIdx * STEP), 'Daily Expected Number: '))
				dailyDiscrepancyData.push(point(days[dayIdx], 'pm', (today.am + Number(today.add) - numberOfSales) - today.pm, (dayIdx * STEP) + 2, 'Daily Expected Number: '))
			} else {
				dailyDiscrepancyData.push(point(days[dayIdx], 'am', prevDay.pm - today.am, (dayIdx * STEP), 'Daily Expected Number: '))
				dailyDiscrepancyData.push(point(days[dayIdx], 'pm', (prevDay.pm + Number(today.add) - numberOfSales) - today.pm, (dayIdx * STEP) + 2, 'Daily Expected Number: '))
				prevDay = today
			}
		}

		localDispatch({
			type: DataSetEnum.SET_DAILY_DISCREPANCY_DATA,
			payload: dailyDiscrepancyData
		})
	}, [data, days, game])


	// Cumulative Discrepancy
	useEffect(() => {
		const cumulativeDiscrepancyData: OneSeriesPoint[] = []
		let prevDay: SeriesData = data[0]
		let discrepancy: number = 0

		for (let dayIdx = 0; dayIdx < data.length; dayIdx ++) {
			const today: SeriesData = data[dayIdx]
			const price: number = game ? game.price : 1
			const numberOfSales: number = today.sales / price

			let pmDiscrepancy: number

			if (dayIdx === 0) {
				pmDiscrepancy = (today.am + Number(today.add) - numberOfSales) - today.pm
			} else {
				pmDiscrepancy = (prevDay.pm + Number(today.add) - numberOfSales) - today.pm
				prevDay = today
			}

			discrepancy += pmDiscrepancy
			cumulativeDiscrepancyData.push(point(days[dayIdx], 'pm', discrepancy, (dayIdx * STEP) + 2, 'Cumulative Discrepancy: '))
		}

		localDispatch({
			type: DataSetEnum.SET_CUMULATIVE_DISCREPANCY_DATA,
			payload: cumulativeDiscrepancyData
		})

	}, [data, days, game])



	function createOneSeriesPoint (
		dataPoint: SeriesData, 
		dayIdx: number, 
		time: 'am' | 'pm', 
		contextLabel?: string
	): OneSeriesPoint {
		const offset = time === 'am' ? 0 : 2
		return point(days[dayIdx], time, dataPoint[time], (dayIdx * STEP) + offset, contextLabel)
	}

	function point (
		day: string, 
		time: 'am' | 'pm' | 'change demand' | 'pm sales', 
		value: number, 
		x: number, 
		contextLabel?: string
	) {
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

	const handleCrosshairChange = (datapoint: any) => {
		const { x } = datapoint
		dispatch(crosshairPositionSet(x))
	}

	useEffect(() => {
		const newCrosshairData: CrosshairValue = {}

		const filter = (each: OneSeriesPoint) => each.x === crosshairPosition

		const count = dataSets.parsedData.find(filter)
		const sales = dataSets.salesData.find(filter)
		const dailyExpected = dataSets.dailyExpectedData.find(filter)
		const dailyDiscrep = dataSets.dailyDiscrepancyData.find(filter)
		const cumulativeExpect = dataSets.cumulativeExpectedData.find(filter)
		const cumulativeDiscrep = dataSets.cumulativeDiscrepancyData.find(filter)

		newCrosshairData.count = count
		if (SHOW_SALES && sales) newCrosshairData.sales = sales
		if (SHOW_DAILY_EXPECTED && dailyExpected) newCrosshairData.dailyExpected = dailyExpected
		if (SHOW_DAILY_DISCREP && dailyDiscrep) newCrosshairData.dailyDiscrepancy = dailyDiscrep
		if (SHOW_CUMULATIVE_EXPECTED && cumulativeExpect) newCrosshairData.cumulativeExpected = cumulativeExpect
		if (SHOW_CUMULATIVE_DISCREP && cumulativeDiscrep) newCrosshairData.cumulativeDiscrepancy = cumulativeDiscrep

		setCrosshairValue(newCrosshairData)
	}, [
		SHOW_SALES,
		SHOW_DAILY_EXPECTED,
		SHOW_DAILY_DISCREP,
		SHOW_CUMULATIVE_DISCREP,
		SHOW_CUMULATIVE_EXPECTED,
		crosshairPosition,
		dataSets
	])

	const handleMouseLeave = () => {
		setHintValue(null)
		setCrosshairValue(null)
		dispatch(crosshairReset())
	}

	if (dataSets.parsedData.length === 0) {
		return (
			<div>
				NO DATA
			</div>
		)
	}

	// const crosshairSeriesStyle: CSSProperties = {
	// 	margin: '2px',
	// 	whiteSpace: 'nowrap',
	// }
	const crosshairSeriesStyle = css({
		margin: '2px',
		whiteSpace: 'nowrap',
	})

	return (
		<div
			css={css({
				position: 'relative'
			})}
		>
			<h3>
				{
					game ? `${game.number} - ${game.name} (£${game.price})` : ''	
				}
			</h3>
			<XYPlot
				width={WIDTH}
				height={HEIGHT}
				onMouseLeave={handleMouseLeave}
				// animation={true}
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
						color={colours.dailyExpected}
					/>
				}
				{
					SHOW_CUMULATIVE_EXPECTED &&
					<LineSeries 
						data={dataSets.cumulativeExpectedData}
						color={colours.cumulativeExpected}
					/>
				}
				{
					SHOW_CUMULATIVE_DISCREP &&
					<LineSeries 
						data={dataSets.cumulativeDiscrepancyData}
						color={colours.cumulativeDiscrepancy}
					/>
				}
				{ 
					SHOW_SALES && 
					<LineSeries 
						data={dataSets.salesData}
						color={colours.sales}
					/>
				}
				{ 
					SHOW_DAILY_DISCREP && 
					<LineSeries 
						data={dataSets.dailyDiscrepancyData}
						color={colours.dailyDiscrepancy}
					/>
				}
				{
					SHOW_COUNT &&
					<LineSeries 
						data={dataSets.parsedData}
						color={colours.count}
						
					/>
				}
				{
					SHOW_DAILY_EXPECTED &&
					<MarkSeries 
						data={dataSets.dailyExpectedData}
						color={colours.dailyExpected}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				{
					SHOW_CUMULATIVE_EXPECTED &&
					<MarkSeries 
						data={dataSets.cumulativeExpectedData}
						color={colours.cumulativeExpected}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				{
					SHOW_CUMULATIVE_DISCREP &&
					<MarkSeries 
						data={dataSets.cumulativeDiscrepancyData}
						color={colours.cumulativeDiscrepancy}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				{ 
					SHOW_SALES && 
					<MarkSeries 
						data={dataSets.salesData}
						color={colours.sales}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				{ 
					SHOW_DAILY_DISCREP && 
					<MarkSeries 
						data={dataSets.dailyDiscrepancyData}
						color={colours.dailyDiscrepancy}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				{
					SHOW_COUNT &&
					<MarkSeries 
						data={dataSets.parsedData}
						color={colours.count}
						onValueMouseOver={handleMarkMouseOver}
					/>
				}
				<MarkSeries 
					data={dataSets.parsedData}
					color={'rgba(0,0,0,0)'}
					// onValueMouseOver={handleMarkMouseOver}
					style={{
						pointerEvents: 'none'
					}}
					onNearestX={handleCrosshairChange}
				/>
				{
					(hintValue !== null) && 
					<Hint 
						value={hintValue} 
					>
						<div
							css={tooltipStyle}
						>
							{/* @ts-ignore */}
							<p css={css({margin: '0'})}>{hintValue.label}</p>
							{/* @ts-ignore */}
							<p css={css({margin: '0'})}>Day: {Math.round(hintValue.x)}</p>
							{/* @ts-ignore */}
							<p css={css({margin: '0'})}>Number: {Math.round(hintValue.y)}</p>
						</div>
					</Hint>
				}
				{
					(crosshairPosition !== null) && 
					<Crosshair 
						values={[{ x: crosshairPosition }]} 
					>
						{
							(crosshairValue !== null) &&
							<div
								css={css({
									...tooltip,
									transform: 'translateY(-100%)',
									display: 'flex',
									flexDirection: 'column',
								})}
							>
								{/* @ts-ignore */}
								{crosshairValue.count ? <p css={crosshairSeriesStyle}>{`Count: ${crosshairValue.count.y}`}</p> : ''}
								{/* @ts-ignore */}
								{crosshairValue.sales ? <p css={crosshairSeriesStyle}>{`Sales: ${crosshairValue.sales.y}`}</p> : ''}
								{/* @ts-ignore */}
								{crosshairValue.dailyExpected ? <p css={crosshairSeriesStyle}>{`Expected: ${crosshairValue.dailyExpected.y}`}</p> : ''}
								{/* @ts-ignore */}
								{crosshairValue.dailyDiscrepancy ? <p css={crosshairSeriesStyle}>{`Discrepancy: ${crosshairValue.dailyDiscrepancy.y}`}</p> : ''}
								{/* @ts-ignore */}
								{crosshairValue.cumulativeExpected ? <p css={crosshairSeriesStyle}>{`Cumulative Expected Value: ${crosshairValue.cumulativeExpected.y}`}</p> : ''}
								{/* @ts-ignore */}
								{crosshairValue.cumulativeDiscrepancy ? <p css={crosshairSeriesStyle}>{`Cumulative Discrepancy Value: ${crosshairValue.cumulativeDiscrepancy.y}`}</p> : ''}
							</div>
						}
					</Crosshair>
				}
			</XYPlot>
		</div>
	)
}

export default GraphOneSeries