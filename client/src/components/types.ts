
export interface Game {
	id: number
	name: string
	number: number
	price: number
}

export interface Series {
	gameId: number
	fromDay: number
	toDay: number
	slot: number
}

export interface Count { 
	id: number
	day: OneDay
	date: Date
}

export type OneDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export interface ContextStateType {
	games: Game[]
	counts: Count[]
	series: Series[]
	day: number
	days: OneDay[]
}

export enum ContextAction {
	GAME_ADD_ONE = 'GAME_ADD_ONE',
	GAME_REMOVE_ONE = 'GAME_REMOVE_ONE',
	GAME_UPDATE_CARD = 'GAME_UPDATE_CARD',

	DAY_SET = 'DAY_SET',
	DAY_INCREMENT = 'DAY_INCREMENT',
	DAY_DECREMENT = 'DAY_DECREMENT',

	SERIES_ADD_ONE = 'SERIES_ADD_ONE',
}

export interface ContextActionType {
	type: ContextAction
	payload: any
}