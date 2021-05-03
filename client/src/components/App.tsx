import React, { 
	useReducer, 
	Dispatch,
} from 'react'
import './App.css'

import AddGame from './AddGame'
import GameLine from './GameLine'
import AddSeries from './AddSeries'
import DayControls from './DayControls'
import CardList from './CardList'

import {
	initialContextState,
} from './Utils'

import ContextReducer from './Reducer'

import { 
	Series, 
	ContextStateType, 
	ContextActionType 
} from './types'

import Context from './Context'

const App: React.FC = () => {
	const [state, dispatch]: [ContextStateType, Dispatch<ContextActionType>] = useReducer(ContextReducer, initialContextState)

  return (
		<Context.Provider
			value={{ state, dispatch }}
		>
			<div 
				className="App"
				style={{
					display: 'flex',
					background: '#333',
					color: '#ecf0f1',
					height: '100vh',
				}}
			>
				<div>
					<AddGame />
					<CardList />
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<DayControls />
					<p>New Count</p>
					<table>
						<tr>
							<th>Game</th>
							<th>AM Count</th>
							<th>Additions</th>
							<th>PM Count</th>
							<th>Sales (VBS)</th>
						</tr>
						<tbody>
							{
								state.series.map((each: Series, idx: number) => 
									<GameLine 
										key={idx}
										games={state.games} 
										day={state.day}
										gameId={each.gameId}
										idx={idx}
									/>
								)
							}
						</tbody>
					</table>
					<AddSeries />
				</div>
			</div>
		</Context.Provider>
  );
}

export default App;
