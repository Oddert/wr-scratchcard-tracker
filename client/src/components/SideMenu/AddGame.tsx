import React, { useContext, useState } from 'react'
import Context from '../Context'

import {
	gameAddOne,
} from '../Actions'

interface Props {
	// addGame: (name: string, number: number, price: number) => any
}

const AddGame: React.FC<Props> = () => {
	const { state, dispatch } = useContext(Context)

	const [name, setName] = useState('')
	const [number, setNumber] = useState(1000)
	const [price, setPrice] = useState(5)

	const submitGame = (e: any) => {
		e.preventDefault()
		if (number === 1000 || !/[a-zA-Z]/gi.test(name)) return
		dispatch(gameAddOne(state.games, name, number, price))
	}

	return (
		<form
			onSubmit={submitGame}
		>
			<input 
				type="number"
				min={1000}
				max={9999}
				value={number}
				onChange={(e: any) => setNumber(e.target.value)}
			/>
			<input 
				type="text"
				value={name}
				onChange={(e: any) => setName(e.target.value)}
			/>
			<select 
				value={price}
				onChange={(e: any) => setPrice(e.target.value)}
			>
				<option value='5'>£5</option>
				<option value='3'>£3</option>
				<option value='2'>£2</option>
				<option value='1'>£1</option>
			</select>
			<input 
				type="submit"
				value='Add Game'
			/>
		</form>
	)
}

export default AddGame