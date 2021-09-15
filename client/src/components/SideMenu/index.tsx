/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

import CardList from '../CardList/'
import GraphControls from '../GraphControls'

const SideMenu: React.FC = () => {
	return (
		<div
			css={css({
				background: '#464646',
				boxShadow: '10px 0px 10px rgba(0,0,0,.15)',
			})}
		>
			<div
				css={css({
					// border: '1px dashed tomato',
					position: 'sticky',
					top: '0px',
					maxHeight: '100vh',
					overflowY: 'auto',
					padding: '0px 30px', 
				})}
			>
				<GraphControls />
				<CardList />
			</div>
		</div>
	)
}

export default SideMenu