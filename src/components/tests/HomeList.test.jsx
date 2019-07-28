import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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
		const termInput = getTermInput(renderUtils)

		expect(getListItems(renderUtils)).toHaveLength(3)
		expect(termInput).toBeInTheDocument()

		fireEvent.change(termInput, { target: { value: 'lorem' } })
		expect(getListItems(renderUtils)).toHaveLength(2)

		fireEvent.change(termInput, { target: { value: 'lorem ipsum' } })
		expect(getListItems(renderUtils)).toHaveLength(1)

		fireEvent.change(termInput, { target: { value: 'invalid search term' } })
		expect(getEmptyState(renderUtils)).toBeInTheDocument()

		// case insensitive
		fireEvent.change(termInput, { target: { value: 'LOREM' } })
		expect(getListItems(renderUtils)).toHaveLength(2)

		fireEvent.change(termInput, { target: { value: 'lOReM' } })
		expect(getListItems(renderUtils)).toHaveLength(2)
	})
})
