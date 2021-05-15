import {
	Game,
	Series,
	ContextAction,
} from './types'

import { initialSeriesData } from './Utils'

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

export const gameChangeCard = (series: Series[], seriesIdx: number, updateGameId: number) => {
	const gameId: number = Number(updateGameId)
	if (isNaN(gameId)) {
		console.error(`[gameChangeCard]: Failed to dispatch action, requested game ID is not a number`, {series, seriesIdx, gameId: updateGameId})
		return {}
	}
	const updateSeries = series.map((each: Series, idx: number) => {
		if (idx === seriesIdx) {
			return {
				...each,
				gameId,
			}
		} else return each
	})
	return {
		type: ContextAction.SERIES_UPDATE_CARD,
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
		data: initialSeriesData
	}
	return {
		type: ContextAction.SERIES_ADD_ONE,
		payload: createSeries
	}
}

export const seriesUpdateSlot = (seriesIdx: number | string, slot: number | string) => {
	return {
		type: ContextAction.SERIES_SLOT_UPDATE,
		payload: {
			seriesIdx,
			value: Number(slot)
		}
	}
}

export const seriesDataUpdateAM = (seriesIdx: number | string, value: number | string) => {
	return {
		type: ContextAction.SERIES_DATA_UPDATE_AM,
		payload: {
			seriesIdx,
			value: Number(value),
		}
	}
}

export const seriesDataUpdatePM = (seriesIdx: number | string, value: number | string) => {
	return {
		type: ContextAction.SERIES_DATA_UPDATE_PM,
		payload: {
			seriesIdx,
			value: Number(value),
		}
	}
}

export const seriesDataUpdateSales = (seriesIdx: number | string, value: number | string) => {
	return {
		type: ContextAction.SERIES_DATA_UPDATE_SALES,
		payload: {
			seriesIdx,
			value: Number(value),
		}
	}
}

export const seriesDataUpdateAdditions = (seriesIdx: number | string, value: number | string) => {
	return {
		type: ContextAction.SERIES_DATA_UPDATE_ADDITIONS,
		payload: {
			seriesIdx,
			value: Number(value),
		}
	}
}

export const crosshairPositionSet = (x: number) => {
	return {
		type: ContextAction.UI_SET_CROSSHAIR_POS,
		payload: x
	}
}

export const crosshairReset = () => {
	return {
		type: ContextAction.UI_UNSET_CROSSHAIR_POS
	}
}