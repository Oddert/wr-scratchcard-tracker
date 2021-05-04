
import {
	ContextStateType,
	DayState,
	// ContextActionType,
} from './types'

export const initialDayState: DayState[] = [
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
]

export const initialContextState: ContextStateType = {
	games: [
		{ id: 0, number: 1256, name: 'Mono Mill', price: 5 },
		{ id: 1, number: 1255, name: '50X', price: 5 },
		{ id: 2, number: 1262, name: '100K AMFAY', price: 5 },
		{ id: 3, number: 1193, name: 'Fruity 500', price: 5 },
		{ id: 4, number: 1192, name: 'Cash 7s', price: 5 },
		{ id: 5, number: 1223, name: 'Red Hot Bingo', price: 3 },
		{ id: 6, number: 1261, name: '250K Orange', price: 2 },
		{ id: 7, number: 1244, name: '20K AMFAY', price: 2 },
		{ id: 8, number: 1226, name: 'Spin 100', price: 2 },
		{ id: 9, number: 1228, name: '100K Pink', price: 1 },
		{ id: 10, number: 1274, name: 'Cash Trippler', price: 1 },
		{ id: 11, number: 1248, name: 'Cash Grid', price: 1 },
	],
	counts: [
		{ id: 1, day: 'Monday', date: new Date(),  },
	],
	series: [
		{ gameId: 0, fromDay: 0, toDay: 6, slot: 1, data: initialDayState }, 
		{ gameId: 1, fromDay: 0, toDay: 6, slot: 2, data: initialDayState },
	],
	day: 0,
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
}
