/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext } from 'react'
import { css, jsx } from '@emotion/react'

import {
	ContextStateType,
} from '../types'

import Context from '../Context'

import Toggle from './Toggle'

const GraphControls: React.FC = () => {
	const { state }: { state: ContextStateType } = useContext(Context)
	return (
		<div
			css={css({
				display: 'flex',
				flexDirection: 'column',
				// justifyContent: 'center',
				alignItems: 'center',
			})}
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
				})}
			>
				{
					Object.keys(state.ui.seriesActive).map((series: any, idx: any) => 
						<Toggle 
							key={idx}
							seriesSwitch={series}
						/>
					)
				}
			</ul>
		</div>
	)
}

export default GraphControls