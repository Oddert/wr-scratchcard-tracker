
import { 
	ContextStateType, 
	ContextActionType,
	ContextAction,
} from './types'

const ContextReducer = (state: ContextStateType, action: ContextActionType) => {
	switch (action.type) {
		case ContextAction.GAME_ADD_ONE: return reduceGameAddOne(state, action)
		case ContextAction.GAME_REMOVE_ONE: return reduceGameRemoveOne(state, action)
		case ContextAction.DAY_SET: return reduceDaySet(state, action)
		case ContextAction.DAY_INCREMENT: return reduceDayInc(state, action)
		case ContextAction.DAY_DECREMENT: return reduceDayDec(state, action)
		case ContextAction.SERIES_ADD_ONE: return reduceSeriesAddOne(state, action)
		case ContextAction.SERIES_DATA_UPDATE_AM: return reducerSeriesDataUpdateAM(state, action)
		case ContextAction.SERIES_DATA_UPDATE_PM: return reducerSeriesDataUpdatePM(state, action)
		case ContextAction.SERIES_DATA_UPDATE_SALES: return reducerSeriesDataUpdateSales(state, action)
		case ContextAction.SERIES_DATA_UPDATE_ADDITIONS: return reducerSeriesDataUpdateAdditions(state, action)
		default: return state
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

function reducerSeriesDataUpdateAM (state: ContextStateType, action: ContextActionType): ContextStateType {
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

function reducerSeriesDataUpdatePM (state: ContextStateType, action: ContextActionType): ContextStateType {
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

function reducerSeriesDataUpdateSales (state: ContextStateType, action: ContextActionType): ContextStateType {
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

function reducerSeriesDataUpdateAdditions (state: ContextStateType, action: ContextActionType): ContextStateType {
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

export default ContextReducer