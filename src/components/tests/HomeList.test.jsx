import React from 'react'
import { render, prettyDOM, cleanup, fireEvent } from '@testing-library/react'
import HomeList from '../HomeList'

describe('<HomeList/>', () => {
	const mockList = [
		{ id: '1', name: 'lorem ipsum' },
		{ id: '2', name: 'lorem dolor' },
		{ id: '3', name: 'ipsum dolor' },
	]

	const getTermInput = renderUtils => renderUtils.getByLabelText(/filtr/i)
	const getEmptyState = renderUtils =>
		renderUtils.getByTestId('ListItem-EmptyState')
	const getListItems = renderUtils => renderUtils.getAllByRole('listitem')

	test('renders with term input and a empty list', () => {
		const renderUtils = render(<HomeList />)
		const termInput = getTermInput(renderUtils)
		const emptyState = getEmptyState(renderUtils)
		expect(termInput).toBeInTheDocument()
		expect(emptyState).toBeInTheDocument()
	})

	test('renders with filled list', () => {
		const renderUtils = render(<HomeList list={mockList} />)
		const renderedItems = mockList.map(item => renderUtils.getByText(item.name))
		renderedItems.forEach(item => {
			expect(item).toBeInTheDocument()
		})
	})

	test('filters list by search term', () => {
		const renderUtils = render(<HomeList list={mockList} />)
		const renderedItems = getListItems(renderUtils)
		const termInput = getTermInput(renderUtils)
		expect(renderedItems).toHaveLength(3)
		expect(termInput).toBeInTheDocument()

		fireEvent.change(termInput, { target: { value: 'lorem' } })
		const filtered = getListItems(renderUtils)
		expect(filtered).toHaveLength(2)

		fireEvent.change(termInput, { target: { value: 'lorem ipsum' } })
		const filtered2 = getListItems(renderUtils)
		expect(filtered2).toHaveLength(1)
	})
})
