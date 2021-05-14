
export type OneDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
	
export interface Game {
	id: number
	name: string
	number: number
	price: number
}

export interface Count { 
	id: number
	day: OneDay
	date: Date
}

export interface SeriesData {
	am: number
	add?: number
	pm: number
	sales: number
}

export interface Series {
	gameId: number
	fromDay: number
	toDay: number
	slot: number
	data: SeriesData[]
}

export interface ColourSets {
	sales: string
	count: string
	dailyExpected: string
	dailyDiscrepancy: string
	cumulativeExpected: string
	cumulativeDiscrepancy: string
}

export interface UIStateType {
	seriesActive: {
		count: Boolean
		sales: Boolean
		dailyExpected: Boolean
		dailyDiscrepancy: Boolean
		cumulativeExpected: Boolean 	
		cumulativeDiscrepancy: Boolean
	}
	colourSets: {
		default: ColourSets
	}
	selectedColours: ColourSets
	crosshairPosition: null | number
}

export interface ContextStateType {
	games: Game[]
	counts: Count[]
	series: Series[]
	day: number
	days: OneDay[]
	ui: UIStateType
}

export enum ContextAction {
	GAME_ADD_ONE = 'GAME_ADD_ONE',
	GAME_REMOVE_ONE = 'GAME_REMOVE_ONE',
	GAME_UPDATE_CARD = 'GAME_UPDATE_CARD',

	DAY_SET = 'DAY_SET',
	DAY_INCREMENT = 'DAY_INCREMENT',
	DAY_DECREMENT = 'DAY_DECREMENT',

	SERIES_ADD_ONE = 'SERIES_ADD_ONE',
	SERIES_SLOT_UPDATE = 'SERIES_SLOT_UPDATE',

	SERIES_DATA_UPDATE_AM = 'SERIES_DATA_UPDATE_AM',
	SERIES_DATA_UPDATE_PM = 'SERIES_DATA_UPDATE_PM',
	SERIES_DATA_UPDATE_ADDITIONS = 'SERIES_DATA_UPDATE_ADDITIONS',
	SERIES_DATA_UPDATE_SALES = 'SERIES_DATA_UPDATE_SALES',

	UI_SET_SERIES = 'UI_SET_SERIES',
	UI_SET_CROSSHAIR_POS = 'UI_SET_CROSSHAIR_POS',
	UI_UNSET_CROSSHAIR_POS = 'UI_UNSET_CROSSHAIR_POS',
}

export interface ContextActionType {
	type: ContextAction
	payload: any
}