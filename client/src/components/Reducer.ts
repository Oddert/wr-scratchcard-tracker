
import { 
	ContextStateType, 
	ContextActionType,
	ContextAction,
} from './types'

const ContextReducer = (state: ContextStateType, action: ContextActionType) => {
	console.log(state, action)
	switch (action.type) {
		case ContextAction.GAME_ADD_ONE: return reduceGameAddOne(state, action)
		case ContextAction.GAME_REMOVE_ONE: return reduceGameRemoveOne(state, action)
		case ContextAction.DAY_SET: return reduceDaySet(state, action)
		case ContextAction.DAY_INCREMENT: return reduceDayInc(state, action)
		case ContextAction.DAY_DECREMENT: return reduceDayDec(state, action)
		case ContextAction.SERIES_ADD_ONE: return reduceSeriesAddOne(state, action)
		case ContextAction.SERIES_DATA_UPDATE_AM: return reduceSeriesDataUpdateAM(state, action)
		case ContextAction.SERIES_DATA_UPDATE_PM: return reduceSeriesDataUpdatePM(state, action)
		case ContextAction.SERIES_DATA_UPDATE_SALES: return reduceSeriesDataUpdateSales(state, action)
		case ContextAction.SERIES_DATA_UPDATE_ADDITIONS: return reduceSeriesDataUpdateAdditions(state, action)
		case ContextAction.SERIES_UPDATE_CARD: return reduceSeriesChangeCard(state, action)
		case ContextAction.SERIES_SLOT_UPDATE: return reduceSeriesSlotUpdate(state, action)
		case ContextAction.UI_SET_SERIES: return reduceUiSetSeries(state, action)
		case ContextAction.UI_SET_CROSSHAIR_POS: return reduceUiCrosshairSet(state, action)
		case ContextAction.UI_UNSET_CROSSHAIR_POS: return reduceUiCrosshairReset(state, action)
		default: {
			console.warn(`Default route taken on reducer for action: [${action.type}]`, state, action)
			return state
		}
	}
}

function reduceGameAddOne (state: ContextStateType, action: ContextActionType): ContextStateType {
	return {
		...state,
		games: action.payload
	}
}

function reduceGameRemoveOne (state: ContextStateType, action: ContextActionType): ContextStateType {
	return {
		...state,
		games: action.payload
	}
}

function reduceDaySet (state: ContextStateType, action: ContextActionType): ContextStateType {
	const val = Number(action.payload)
	if (isNaN(val) || val < 0 || val > 6) return  state
	return {
		...state,
		day: val
	}
}

function reduceDayInc (state: ContextStateType, action: ContextActionType): ContextStateType {
	if (state.day === 6) return state
	return {
		...state,
		day: state.day + 1
	}
}

function reduceDayDec (state: ContextStateType, action: ContextActionType): ContextStateType {
	if (state.day === 0) return state
	return {
		...state,
		day: state.day - 1
	}
}

function reduceSeriesAddOne (state: ContextStateType, action: ContextActionType): ContextStateType {
	return {
		...state,
		series: [
			...state.series,
			action.payload
		]
	}
}

function reduceSeriesSlotUpdate (state: ContextStateType, action: ContextActionType): ContextStateType {
	const { seriesIdx, value } = action.payload
	if (isNaN(value) || value < 0 || value > 16) return state
	const series = [...state.series]
	series[seriesIdx].slot = value
	return {
		...state,
		series
	}
}

function reduceSeriesDataUpdateAM (state: ContextStateType, action: ContextActionType): ContextStateType {
	const { seriesIdx, value } = action.payload
	const series = [...state.series]
	const updateData = [...state.series[seriesIdx].data]
	updateData[state.day] = { ...updateData[state.day], am: value }
	series[seriesIdx].data = updateData
	return {
		...state,
		series
	}
}

function reduceSeriesDataUpdatePM (state: ContextStateType, action: ContextActionType): ContextStateType {
	const { seriesIdx, value } = action.payload
	const series = [...state.series]
	const updateData = [...state.series[seriesIdx].data]
	updateData[state.day] = { ...updateData[state.day], pm: value }
	series[seriesIdx].data = updateData
	return {
		...state,
		series
	}
}

function reduceSeriesDataUpdateSales (state: ContextStateType, action: ContextActionType): ContextStateType {
	const { seriesIdx, value } = action.payload
	const series = [...state.series]
	const updateData = [...state.series[seriesIdx].data]
	updateData[state.day] = { ...updateData[state.day], sales: value }
	series[seriesIdx].data = updateData
	return {
		...state,
		series
	}
}

function reduceSeriesDataUpdateAdditions (state: ContextStateType, action: ContextActionType): ContextStateType {
	const { seriesIdx, value } = action.payload
	const series = [...state.series]
	const updateData = [...state.series[seriesIdx].data]
	updateData[state.day] = { ...updateData[state.day], add: value }
	series[seriesIdx].data = updateData
	return {
		...state,
		series
	}
}

function reduceSeriesChangeCard (state: ContextStateType, action: ContextActionType): ContextStateType {
	return {
		...state,
		series: action.payload,
	}
}

function reduceUiSetSeries (state: ContextStateType, action: ContextActionType): ContextStateType {
	return {
		...state,
		ui: {
			...state.ui,
			seriesActive: {
				...state.ui.seriesActive,
				[action.payload.key]: action.payload.value
			},
		}
	}
}

function reduceUiCrosshairSet (state: ContextStateType, action: ContextActionType): ContextStateType {
	return {
		...state,
		ui: {
			...state.ui,
			crosshairPosition: action.payload
		}
	}
}

function reduceUiCrosshairReset (state: ContextStateType, action: ContextActionType): ContextStateType {
	return {
		...state,
		ui: {
			...state.ui,
			crosshairPosition: null
		}
	}
}

export default ContextReducer