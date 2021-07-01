/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext, useState } from 'react'
import { css, jsx } from '@emotion/react'

import Context from './Context'
import {
	gameAddOne,
} from './Actions'

import {
	ContextStateType,
} from './types'

interface Props {
	// addGame: (name: string, number: number, price: number) => any
}

const AddGame: React.FC<Props> = () => {
	const { state, dispatch }: { state: ContextStateType, dispatch: any } = useContext(Context)

	const [open, setOpen] = useState(false)

	const [name, setName] = useState('')
	const [number, setNumber] = useState(1000)
	const [price, setPrice] = useState(5)

	const submitGame = (e: any) => {
		e.preventDefault()

		const inUse = state.games.reduce((acc, each) => {
			if (Number(number) === Number(each.number)) return true
			else return acc 
		}, false)

		if (number === 1000 || !/[a-zA-Z]/gi.test(name) || inUse) return

		dispatch(gameAddOne(state.games, name, number, price))
	}

	const toggleOpen = () => setOpen(!open)

	const pricepoints: [5,3,2,1] = [5,3,2,1]

	return (
		<div>
			<button 
				onClick={toggleOpen}
			>
				{
					open
						? 'Add New Game'
						: 'Close'
				}
			</button>
			{
				!open && (
					<form
						onSubmit={submitGame}
						css={css({
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'stretch',
						})}
					>
						<div>
							<select 
								value={price}
								onChange={(e: any) => setPrice(e.target.value)}
							>
								{
									pricepoints.map((each: number) => 
										<option
											key={each}
											value={each}
										>
											£{each}
										</option>
									)
								}
							</select>
							<input 
								type="number"
								min={1000}
								max={9999}
								value={number}
								onChange={(e: any) => setNumber(e.target.value)}
								css={css({
									width: '8ch',
								})}
							/>
							<input 
								type="text"
								value={name}
								onChange={(e: any) => setName(e.target.value)}
							/>
						</div>
						<input 
							type="submit"
							value='Add Game'
						/>
					</form>
				)
			}
		</div>
	)
}

export default AddGame