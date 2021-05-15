/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

import AddGame from './AddGame'
import CardList from '../CardList/'
import GraphControls from '../GraphControls'

const SideMenu: React.FC = () => {
	return (
		<div
			css={css({
				background: '#464646',
				boxShadow: '10px 0px 10px rgba(0,0,0,.15)',
				padding: '0px 30px',
			})}
		>
			<GraphControls />
			<AddGame />
			<CardList />
		</div>
	)
}

export default SideMenu