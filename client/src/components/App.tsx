import React, { useState } from 'react';
import './App.css';
import GameLine from './GameLine';

import { Game } from './types'

interface InitialState {
	games: Game[],
	counts: any
}

const initialState: InitialState = {
	games: [
		{ id: 1, number: 1256, name: 'Mono Mill' },
		{ id: 2, number: 1255, name: '50X' },
		{ id: 3, number: 1262, name: '100K AMFAY' },
		{ id: 4, number: 1193, name: 'Fruity 500' },
		{ id: 5, number: 1192, name: 'Cash 7s' },
		{ id: 6, number: 1223, name: 'Red Hot Bingo' },
		{ id: 7, number: 1261, name: '250K Orange' },
		{ id: 8, number: 1244, name: '20K AMFAY' },
		{ id: 9, number: 1226, name: 'Spin 100' },
		{ id: 10, number: 1228, name: '100K Pink' },
		{ id: 11, number: 1274, name: 'Cash Trippler' },
		{ id: 12, number: 1248, name: 'Cash Grid' },
	],
	counts: [
		{ id: 1, day: 'MON', date: new Date(),  }
	]
}

function App () {
	const [games, setGames]: [Game[], any] = useState(initialState.games)
	
	const [addingGameName, setAddingGameName] = useState('')
	const [addingGameNumber, setAddingGameNumber] = useState(1000)
	const [day, setDay] = useState(0)

	const addGame = (e: any) => {
		e.preventDefault()
		if (addingGameNumber === 1000 || !/[a-zA-Z]/gi.test(addingGameName)) return
		const newGame: Game = {
			id: games.length + 1,
			name: addingGameName,
			number: addingGameNumber
		}
		const gameUpdate = [
			...games,
			newGame
		]
		.sort((a, b) => a.number - b.number)
		setGames(gameUpdate)
	}

	const removeGame = (id: number) => {
		const gameUpdate = games.filter((each: Game) => each.id !== id)
		setGames(gameUpdate)
	}

	const incDay = () => {
		if (day === 6) return
		setDay(day + 1)
	}

	const decDay = () => {
		if (day === 0) return
		setDay(day - 1)
	}

	const proxySetDay = (val: number | string) => {
		const value = Number(val)
		if (isNaN(value) || value < 0 || value > 6) return
		setDay(value)
	}

	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <div className="App">
			<form
				onSubmit={addGame}
			>
				<input 
					type="text"
					value={addingGameName}
					onChange={(e: any) => setAddingGameName(e.target.value)}
				/>
				<input 
					type="number"
					min={1000}
					max={9999}
					value={addingGameNumber}
					onChange={(e: any) => setAddingGameNumber(e.target.value)}
				/>
				<input 
					type="submit"
					value='Add Game'
 				/>
			</form>
			<p>{days[day%7]}</p>
			<div>
				<button onClick={decDay}>Previous Day</button>
				<input 
					type='number' 
					value={day}
					onChange={(e: any) => proxySetDay(e.target.value)} 
				/>
				<button onClick={incDay}>Next Day</button>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<ul
					style={{
						textAlign: 'left',
						margin: '0 auto',
						border: '1px dashed tomato',
					}}
				>
					{
						games.map((each: Game) => 
							<li
								key={each.id}
							>
								<strong>
									{ each.number }
								</strong>
								- {each.name}
								<button
									onClick={() => removeGame(each.id)}
								>
									X
								</button>
							</li>
						)
					}
				</ul>
			</div>
			<div>
				<p>New Count</p>
				<GameLine 
					games={games} 
					day={day}
				/>
			</div>
    </div>
  );
}

export default App;
