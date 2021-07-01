/** @jsxRuntime classic */
/** @jsx jsx */
import React, { 
	useReducer, 
	Dispatch,
} from 'react'
import { css, jsx } from '@emotion/react'

import './App.css'
import 'font-awesome/css/font-awesome.min.css'

import Graphs from './Graphs'
import SideMenu from './SideMenu/'
import DataInput from './DataInput'

import {
	initialContextState,
} from './Utils'

import ContextReducer from './Reducer'

import { 
	ContextStateType, 
	ContextActionType 
} from './types'

import Context from './Context'

const App: React.FC = () => {
	const [state, dispatch]: [ContextStateType, Dispatch<ContextActionType>] = useReducer(ContextReducer, initialContextState)

  return (
		<Context.Provider
			value={{ state, dispatch }}
		>
			<div 
				className="App"
				css={css({
					display: 'flex',
					minHeight: '100vh',
				})}
			>
				<SideMenu />
				<div
					css={css({
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
					})}
				>
					<DataInput />
					<Graphs />
				</div>
			</div>
		</Context.Provider>
  );
}

export default App;
