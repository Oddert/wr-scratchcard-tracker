
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

export default ContextReducer