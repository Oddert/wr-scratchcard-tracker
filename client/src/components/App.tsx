import React, { useState } from 'react';
import './App.css';

interface Game {
	id: number
	name: string
	number: number
}

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
 				/>
			</form>
			<ul>
				{
					games.map((each: Game) => 
						<li>
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
			<div>
				<p>New Count</p>
				
			</div>
    </div>
  );
}

export default App;
