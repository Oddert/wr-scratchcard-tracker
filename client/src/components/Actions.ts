import {
	Game,
	Series,
	ContextAction,
} from './types'

export const gameAddOne = (games: Game[], name: string, number: number, price: number) => {
	const accept = games.reduce((acc, each) => {
		if (String(each.number) === String(number)) return false
		else return acc
	}, true)

	if (!accept) return 
	
	const newGame: Game = {
		id: games.length + 1,
		name,
		number,
		price,
	}

	const gameUpdate = [
		...games,
		newGame
	]
	.sort((a, b) => a.number - b.number)
	.sort((a, b) => b.price - a.price)
	
	return {
		type: ContextAction.GAME_ADD_ONE,
		payload: gameUpdate
	}
}

export const gameRemoveOne = (games: Game[], id: number) => {
	const gameUpdate = games.filter((each: Game) => each.id !== id)
	return {
		type: ContextAction.GAME_REMOVE_ONE,
		payload: gameUpdate
	}
}

export const gameChangeCard = (series: Series[], seriesIdx: number, gameId: number) => {
	const updateSeries = series.map((each: Series, idx: number) => {
		if (idx === seriesIdx) {
			return {
				...each,
				gameId,
			}
		} else return each
	})
	return {
		type: ContextAction.GAME_UPDATE_CARD,
		payload: updateSeries,
	}
}

export const daySet = (value: number | string) => {
	const val = Number(value)
	if (isNaN(val) || value < 0 || value > 6) {
		return
	} else {
		return {
			type: ContextAction.DAY_SET,
			payload: val,
		}
	}
}

export const dayIncrement = () => {
	return {
		type: ContextAction.DAY_INCREMENT,
	}
}

export const dayDecrement = () => {
	return {
		type: ContextAction.DAY_DECREMENT,
	}
}

export const seriesAddOne = (gameId: number, fromDay?: number, toDay?: number, slot?: number) => {
	const createSeries: Series = {
		gameId,
		fromDay: fromDay || 0,
		toDay: toDay || 6,
		slot: slot || 0,
	}
	return {
		type: ContextAction.SERIES_ADD_ONE,
		payload: createSeries
	}
}