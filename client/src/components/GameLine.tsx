import React, { useContext } from 'react'

import { 
	Game,
} from './types'

import {
	gameChangeCard,
	seriesDataUpdateAdditions,
	seriesDataUpdateAM,
	seriesDataUpdatePM,
	seriesDataUpdateSales,
	seriesUpdateSlot,
} from './Actions'

import Context from './Context'

interface Props {
	idx: number
	gameId: number
}

const GameLine: React.FC<Props> = ({
	idx,
	gameId,
}) => {
	const { state, dispatch } = useContext(Context)

	const data = state.series[idx].data
	const slot = state.series[idx].slot

	const { am, pm, add, sales } = data[state.day]

	return (
		<tr>
			<td>
				{idx}
				<input 
					type='number' 
					placeholder='slot number (set 0 for no slot)'
					value={slot}
					onChange={((e: any) => dispatch(seriesUpdateSlot(idx, e.target.value)))}
				/>
				</td>
				<td>
				<select
					value={gameId}
					onChange={(e: any) => dispatch(gameChangeCard(state.series, idx, e.target.value))}
				>
					{
						state.games.map((each: Game) => 
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
					onChange={((e: any) => dispatch(seriesDataUpdateAM(idx, e.target.value)))}
				/>
			</td>
			<td>
				<input 
					type='number' 
					placeholder='additions' 
					value={add} 
					onChange={((e: any) => dispatch(seriesDataUpdateAdditions(idx, e.target.value)))}
				/>
			</td>
			<td>
				<input 
					type='number' 
					placeholder='PM Count' 
					value={pm} 
					onChange={((e: any) => dispatch(seriesDataUpdatePM(idx, e.target.value)))}
				/>
			</td>
			<td>
				<input 
					type='number' 
					placeholder='VBS Sales' 
					value={sales} 
					onChange={((e: any) => dispatch(seriesDataUpdateSales(idx, e.target.value)))}
				/>
			</td>
		</tr>
	)
}

export default GameLine