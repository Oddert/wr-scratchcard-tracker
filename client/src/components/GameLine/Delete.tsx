import React, { useContext } from 'react'
import { seriesRemoveOne } from '../Actions'
import Context from '../Context'

interface Props {
	idx: number
}

const Delete: React.FC<Props> = ({
	idx
}) => {
	const { dispatch } = useContext(Context)

	const handleClick = () => {
		dispatch(seriesRemoveOne(idx))
	}

	return (
		<button
			onClick={handleClick}
		>
			del
		</button>
	)
}

export default Delete