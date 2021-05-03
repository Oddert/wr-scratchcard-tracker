import React, { useContext } from 'react'
import { dayDecrement, dayIncrement, daySet } from './Actions'
import Context from './Context'

interface Props {
	
}

const DayControls: React.FC<Props> = () => {
	const { state, dispatch } = useContext(Context)
	const { day, days } = state
	return (
		<>
			<p>{days[day%7]}</p>
			<div>
				<button onClick={() => dispatch(dayDecrement())}>Previous Day</button>
				<input 
					type='number' 
					value={day}
					onChange={(e: any) => daySet(e.target.value)} 
				/>
				<button onClick={() => dispatch(dayIncrement())}>Next Day</button>
			</div>
		</>
	)
}

export default DayControls 