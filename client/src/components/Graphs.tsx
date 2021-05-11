import React, { useContext } from 'react'
import Context from './Context'
import GraphControls from './GraphControls'

import GraphOneSeries from './GraphOneSeries'
import { initialContextState } from './Utils'

interface Props {}

const Graphs: React.FC<Props> = () => {
	const { state }: { state: typeof initialContextState } = useContext(Context)
	return (
		<div>
			<GraphControls 
			
			/>
			<div>
				{
					state.series.map((each: any, idx: number) => 
						<GraphOneSeries
							key={idx}
							seriesIdx={idx}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Graphs 