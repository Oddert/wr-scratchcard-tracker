/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext } from 'react'
import { css, jsx } from '@emotion/react'

import {
	Game,
} from '../types'

import Context from '../Context'

import Card from './Card'

const CardList: React.FC = () => {
	const { state } = useContext(Context)
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				// justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h3
				css={css({
					width: '100%',
					textAlign: 'left',
				})}
			>
				Filter
			</h3>
			<ul
				css={css({
					textAlign: 'left',
					padding: 0,
					listStyleType: 'none',
				})}
			>
				{
					state.games.map((each: Game) => 
						<Card 
							key={each.id}
							game={each} 
						/>
					)
				}
			</ul>
		</div>
	)
}

export default CardList