
import {
	ContextStateType,
	SeriesData,
	// ContextActionType,
} from './types'

export const initialSeriesData: SeriesData[] = [
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
	{ am: 0, add: 0, pm: 0, sales: 0 },
]

const testData: SeriesData[][] = [
	[
		{ am: 15, add: 0, pm: 15, sales: 0 },
		{ am: 14, add: 0, pm: 14, sales: 5 },
		{ am: 15, add: 0, pm: 14, sales: 0 },
		{ am: 14, add: 0, pm: 7, sales: 30 },
		{ am: 7, add: 0, pm: 6, sales: 5 },
		{ am: 7, add: 16, pm: 22, sales: 0 },
		{ am: 22, add: 0, pm: 22, sales: 0 },
	],
	// [
	// 	{ am: 0, add: 14, pm: 4, sales: 50 },
	// 	{ am: 4, add: 0, pm: 0, sales: 20 },
	// 	{ am: 0, add: 20, pm: 20, sales: 0 },
	// 	{ am: 20, add: 0, pm: 15, sales: 25 },
	// 	{ am: 15, add: 0, pm: 10, sales: 25 },
	// 	{ am: 10, add: 20, pm: 21, sales: 40 },
	// 	{ am: 21, add: 0, pm: 11, sales: 50 },
	// ],
	// [
	// 	{ am: 0, add: 20, pm: 20, sales: 0 },
	// 	{ am: 20, add: 0, pm: 18, sales: 10 },
	// 	{ am: 18, add: 0, pm: 16, sales: 10 },
	// 	{ am: 16, add: 0, pm: 15, sales: 5 },
	// 	{ am: 15, add: 0, pm: 14, sales: 10 },
	// 	{ am: 13, add: 10, pm: 19, sales: 20 },
	// 	{ am: 19, add: 0, pm: 19, sales: 0 },
	// ],
	// [
	// 	{ am: 12, add: 10, pm: 22, sales: 0 },
	// 	{ am: 22, add: 0, pm: 20, sales: 10 },
	// 	{ am: 20, add: 0, pm: 19, sales: 5 },
	// 	{ am: 19, add: 0, pm: 13, sales: 30 },
	// 	{ am: 13, add: 0, pm: 10, sales: 20 },
	// 	{ am: 9, add: 14, pm: 20, sales: 20 },
	// 	{ am: 20, add: 0, pm: 19, sales: 5 },
	// ]
]

export const initialContextState: ContextStateType = {
	ui: {
		seriesActive: {
			count: true,
			sales: false,
			dailyExpected: true,
			dailyDiscrepancy: false,
			cumulativeExpected: false,	
			cumulativeDiscrepancy: false,
		},
		colourSets: {
			default: {
				sales: 'pink',
				count: '#4285f4',
				dailyExpected: '#34a853',
				dailyDiscrepancy: '#ea4335',
				cumulativeExpected: '#fbbc04',
				cumulativeDiscrepancy: 'purple',
			}
		},
		selectedColours: {
			sales: 'pink',
			count: '#4285f4',
			dailyExpected: '#34a853',
			dailyDiscrepancy: '#ea4335',
			cumulativeExpected: '#fbbc04',
			cumulativeDiscrepancy: 'purple',
		},
	},
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
		{ gameId: 0, fromDay: 0, toDay: 6, slot: 1, data: testData[0] }, 
		// { gameId: 1, fromDay: 0, toDay: 6, slot: 2, data: testData[1] },
		// { gameId: 3, fromDay: 0, toDay: 6, slot: 3, data: testData[2] },
	],
	day: 0,
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
}
