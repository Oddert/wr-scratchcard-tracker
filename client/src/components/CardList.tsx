import React, { useContext } from 'react'
import Context from './Context'

import {
	gameRemoveOne,
} from './Actions'

import {
	Game,
} from './types'

interface Props {

}

const CardList: React.FC<Props> = () => {
	const { state, dispatch } = useContext(Context)

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<ul
				style={{
					textAlign: 'left',
					margin: '0 auto',
					border: '1px dashed tomato',
				}}
			>
				{
					state.games.map((each: Game) => 
						<li
							key={each.id}
						>
							<strong>
								{ each.number }
							</strong>
							- {each.name} (£{each.price})
							<button
								onClick={() => dispatch(gameRemoveOne(state.games, each.id))}
							>
								X
							</button>
						</li>
					)
				}
			</ul>
		</div>
	)
}

export default CardList