/** @jsxRuntime classic */
/** @jsx jsx */
import React, {
	useContext
} from 'react'
import { FaTimes } from 'react-icons/fa'
// import { MdClear } from 'react-icons/md'
import { css, jsx } from '@emotion/react'

import {
	gameRemoveOne,
} from '../Actions'

import Context from '../Context'

import {
	Game
} from '../types'

interface Props {
	game: Game
}

const Card: React.FC<Props> = ({
	game,
}) => {
	const { state, dispatch } = useContext(Context)

	const { price, number, name } = game

	const handleDelete = () => dispatch(gameRemoveOne(state.games, game.id))
	return (
	<li
		css={css({
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
		})}
	>
		<span>
			<span
				css={css({
					opacity: .5,
					margin: '0 20px'
				})}
			>
				£{ price }
			</span>
			<strong>
				{ number }
			</strong>
			<span>
				{` - ${ name }`}
			</span>
		</span>
		<button
			onClick={handleDelete}
			css={css({
				marginLeft: 20,
				background: 'none',
				border: 'none',
				color: '#ecf0f1',
				opacity: .5,
				":hover": {
					background: '#bec3c7',
					opacity: 1,
					color: '#333',
				}
			})}
		>
			<FaTimes />
			{/* <MdClear /> */}
		</button>
	</li>
	)
}

export default Card