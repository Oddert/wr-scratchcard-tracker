import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import App from '../components/App'

import Context from '../components/Context'

afterEach(cleanup)

const renderWithContext = (component: any) => {
	return {
		...render(
			<Context.Provider
				value={Context}
			>
				{component}
			</Context.Provider>
		)
	}
}

it('renders to the DOM', () => {
	const { getByTestId } = renderWithContext(<App />)
	expect(getByTestId('container')).toBeInTheDocument()
})