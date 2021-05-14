import React from 'react'

import AddGame from './AddGame'
import CardList from './CardList'

const SideMenu: React.FC = () => {
	return (
		<div>
			<AddGame />
			<CardList />
		</div>
	)
}

export default SideMenu