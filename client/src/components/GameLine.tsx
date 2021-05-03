import React, { useState } from 'react'

import { Game } from './types'

interface Props {
	games: Game[],
	day: number
}

interface DayState {
	am: number
	add?: number
	pm: number
}

const initialState: DayState[] = [
	{ am: 0, add: 0, pm: 0 },
	{ am: 0, add: 0, pm: 0 },
	{ am: 0, add: 0, pm: 0 },
	{ am: 0, add: 0, pm: 0 },
	{ am: 0, add: 0, pm: 0 },
	{ am: 0, add: 0, pm: 0 },
	{ am: 0, add: 0, pm: 0 },
]

const GameLine: React.FC<Props> = ({
	games,
	day,
}) => {

	const [data, setData]: [DayState[], any] = useState(initialState)

	// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

	const updateAM = (e: any) => {
		const updateData = [...data]
		if (!updateData[day]) updateData[day] = { am: 0, add: 0, pm: 0 }
		updateData[day].am = e.target.value
		setData(updateData)
	}
	
	const updateAdd = (e: any) => {
		const updateData = [...data]
		if (!updateData[day]) updateData[day] = { am: 0, add: 0, pm: 0 }
		updateData[day].add = e.target.value
		setData(updateData)		
	}
	
	const updatePM = (e: any) => {
		const updateData = [...data]
		if (!updateData[day]) updateData[day] = { am: 0, add: 0, pm: 0 }
		updateData[day].pm = e.target.value
		setData(updateData)
	}

	const { am, pm, add } = data[day]

	return (
		<form>
			<p>
				{JSON.stringify(data)}
			</p>
			<div>
				<select>
					{
						games.map((each: Game) => 
							<option 
								value={each.id}
							>
								{ each.number } - { each.name }										
							</option>
						)
					}
				</select>
				<input 
					type='number' 
					placeholder='AM Count' 
					value={am} 
					onChange={updateAM}
					/>
				<input 
					type='number' 
					placeholder='additions' 
					value={add} 
					onChange={updateAdd}
					/>
				<input 
					type='number' 
					placeholder='PM Count' 
					value={pm} 
					onChange={updatePM}
				/>
			</div>
		</form>
	)
}

export default GameLine