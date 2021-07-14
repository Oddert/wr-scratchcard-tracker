import React, {
	useContext
} from 'react'

import {
	Series
} from './types'

import Context from './Context'

import DayControls from './DayControls'
import GameLine from './GameLine/'
import AddSeries from './AddSeries'

const DataInput: React.FC = () => {
	const { state } = useContext(Context)
	return (
		<div>
			<DayControls />
			<p>New Count</p>
			<table>
				<thead>
					<tr>
						{/* <th>Slot Number</th> */}
						<th>Game</th>
						<th>AM Count</th>
						<th>PM Count</th>
						<th>Additions</th>
						<th>Sales (VBS)</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						state.series.map((each: Series, idx: number) => 
							<GameLine 
								key={idx}
								gameId={each.gameId}
								idx={idx}
							/>
						)
					}
				</tbody>
			</table>
			<AddSeries />
		</div>
	)
}

export default DataInput