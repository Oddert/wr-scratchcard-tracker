import React, { useContext } from 'react'
import {
	ContextStateType,
} from '../types'
import Context from '../Context'

import Toggle from './Toggle'

interface Props {}

const GraphControls: React.FC<Props> = () => {
	const { state }: { state: ContextStateType } = useContext(Context)
	return (
		<div
			style={{
				// border: '1px dashed blue',
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					textAlign: 'left',
				}}
			>
				{
					Object.keys(state.ui.seriesActive).map((series: any) => 
						<Toggle 
							seriesSwitch={series}
						/>
					)
				}
			</div>
		</div>
	)
}

export default GraphControls