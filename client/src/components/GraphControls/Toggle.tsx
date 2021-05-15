/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useContext } from 'react'
import { css, jsx } from '@emotion/react'

import { ContextAction } from '../types'

import Context from '../Context'

interface Props {
	seriesSwitch: string
}

const Toggle: React.FC<Props> = ({
	seriesSwitch,
}) => {
	const { state, dispatch } = useContext(Context)

	const { seriesActive, selectedColours } = state.ui

	const id = `seriesVisualisationToggle_${seriesSwitch}`

	const sanitiseLabel = (str: string) => {
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

	const w = 6
	const h = 25

	return (
		<li
			style={{
				display: 'flex',
				position: 'relative',
			}}
		>	
			<div
				style={{
					width: `${w}px`,
					height: `${h}px`,
					backgroundColor: selectedColours[seriesSwitch],
					marginRight: 20,
				}}
			/>
			<div
				css={css({
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
				})}
			>
				<label 
					htmlFor={id}
				>
					{
						sanitiseLabel(seriesSwitch)
					}
				</label>
				<input 
					type='checkbox'
					onChange={handleChange}
					checked={seriesActive[seriesSwitch]}
					id={id}
					css={css({
						marginLeft: 40,
					})}
				/>
			</div>
		</li>
	)
}

export default Toggle