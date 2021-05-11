import React, { useContext } from 'react'
import Context from '../Context'
import { ContextAction } from '../types'

interface Props {
	seriesSwitch: string
}

const Toggle: React.FC<Props> = ({
	seriesSwitch,
}) => {
	const { state, dispatch } = useContext(Context)

	const { seriesActive, selectedColours } = state.ui

	const id = `seriesVisualisationToggle_${seriesSwitch}`

	const upper = (str: string) => {
		return `${str.substring(0,1).toUpperCase()}${str.substring(1)}`
	}

	const handleChange = (e: any) => {
		dispatch({
			type: ContextAction.UI_SET_SERIES,
			payload: {
				key: seriesSwitch,
				value: !seriesActive[seriesSwitch]
			}
		})
	}

	const w = 25

	return (
		<div
			style={{
				display: 'flex'
			}}
		>	
			<div
				style={{
					width: `${w}px`,
					height: `${w}px`,
					backgroundColor: selectedColours[seriesSwitch],
				}}
			/>
			<input 
				type='checkbox'
				onChange={handleChange}
				checked={seriesActive[seriesSwitch]}
				id={id}
			/>
			<label 
				htmlFor={id}
			>
				{
					upper(seriesSwitch)
				}
			</label>
		</div>
	)
}

export default Toggle