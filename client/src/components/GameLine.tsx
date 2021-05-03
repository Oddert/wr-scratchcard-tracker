import React, { useContext, useState } from 'react'

import { Game } from './types'

import {
	gameChangeCard,
} from './Actions'
import Context from './Context'

interface Props {
	games: Game[]
	day: number
	gameId: number
	idx: number
}

interface DayState {
	am: number
	add?: number
	pm: number
	sales: number
}

const initialState: DayState[] = [
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
]

const GameLine: React.FC<Props> = ({
	games,
	day,
	gameId,
	idx,
}) => {

	const { state, dispatch } = useContext(Context)

	const [data, setData]: [DayState[], any] = useState(initialState)

	// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

	const updateAM = (e: any) => {
		const updateData = [...data]
		if (!updateData[day]) updateData[day] = { am: 0, add: 0, pm: 0, sales: 0 }
		updateData[day].am = e.target.value
		setData(updateData)
	}
	
	const updateAdd = (e: any) => {
		const updateData = [...data]
		if (!updateData[day]) updateData[day] = { am: 0, add: 0, pm: 0, sales: 0 }
		updateData[day].add = e.target.value
		setData(updateData)		
	}
	
	const updatePM = (e: any) => {
		const updateData = [...data]
		if (!updateData[day]) updateData[day] = { am: 0, add: 0, pm: 0, sales: 0 }
		updateData[day].pm = e.target.value
		setData(updateData)
	}

	const updateSales = (e: any) => {
		const updateData = [...data]
		if (!updateData[day]) updateData[day] = { am: 0, add: 0, pm: 0, sales: 0 }
		updateData[day].sales = e.target.value
		setData(updateData)
	}

	const { am, pm, add, sales } = data[day]

	return (
		<tr>
			{/* <form>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				> */}
				<td>
					<select
						value={gameId}
						onChange={(e: any) => dispatch(gameChangeCard(state.series, idx, e.target.value))}
					>
						{
							games.map((each: Game) => 
								<option 
									value={each.id}
									key={each.id}
								>
									{ each.number } - { each.name }										
								</option>
							)
						}
					</select>
				</td>
				<td>
					<input 
						type='number' 
						placeholder='AM Count' 
						value={am} 
						onChange={updateAM}
					/>
				</td>
				<td>
					<input 
						type='number' 
						placeholder='additions' 
						value={add} 
						onChange={updateAdd}
					/>
				</td>
				<td>
					<input 
						type='number' 
						placeholder='PM Count' 
						value={pm} 
						onChange={updatePM}
					/>
				</td>
				<td>
					<input 
						type='number' 
						placeholder='VBS Sales' 
						value={sales} 
						onChange={updateSales}
					/>
				</td>
					{/* <p>
						{
							(Number(am) + (Number(add) || 0) - Number(pm))
						}
					</p> */}
				{/* </div>
			</form> */}
		</tr>
	)
}

export default GameLine