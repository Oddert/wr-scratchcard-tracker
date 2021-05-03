import React, { useContext, useState } from 'react'

import { Game, Series } from './types'

import { seriesAddOne } from './Actions'
import Context from './Context'

interface Props {

}

const AddSeries: React.FC<Props> = () => {
	const { state, dispatch } = useContext(Context)
	const [game, setGame]: [number, any] = useState(0)

	const handleSubmit = (e: any) => {
		e.preventDefault()
		dispatch(seriesAddOne(game, 0, 6, 0))
	}

	return (
		<form
			onSubmit={handleSubmit}
		>
			<select
				value={game}
				onChange={(e: any) => setGame(e.target.value)}
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
			<input type='submit' value='Create New Series' />
		</form>
	)
}

export default AddSeries