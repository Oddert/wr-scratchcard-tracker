import React, { useContext } from 'react'
import Context from './Context'

import GraphOneSeries from './GraphOneSeries'

interface Props {}

const Graphs: React.FC<Props> = () => {
	const { state } = useContext(Context)
	return (
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
	)
}

export default Graphs 