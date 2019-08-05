import React, { useEffect, useState } from 'react'
import { act, render, fireEvent, wait } from '@testing-library/react'
// import { renderHook } from '@testing-library/react-hooks'

import useAsync from '../useAsync'

describe('useAsync', () => {
	async function mockFetchId(id) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (id == null) {
					reject(new Error('Id is not valid'))
				}
				resolve({ id })
			}, 50)
		})
	}
	function WrapperUseAsync(props) {
		const [fetchId, fetchState] = useAsync(mockFetchId)
		useEffect(() => {
			fetchId(props.id)
		}, [fetchId, props.id])

		if (fetchState.pending) {
			return <div>Loading</div>
		}
		if (fetchState.error) {
			return <div>Error: {fetchState.error.message}</div>
		}
		if (fetchState.result) {
			return <div>ID: {fetchState.result.id}</div>
		}
		return null
	}
	function WrapperUpdateUseAsync() {
		const genId = () => Math.floor(Math.random() * 100)
		let [id, setId] = useState(genId())

		return (
			<>
				<button data-testid="generate-id" onClick={() => setId(genId())} />
				<button data-testid="generate-error" onClick={() => setId(null)} />
				<WrapperUseAsync id={id} />
			</>
		)
	}
	test('fulfill flow', async () => {
		const renderUtils = render(<WrapperUseAsync id={10} />)
		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			expect(renderUtils.queryByText('ID: 10')).not.toBe(null)
		})
	})

	test('reject flow', async () => {
		const renderUtils = render(<WrapperUseAsync />)
		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			expect(renderUtils.queryByText('Error: Id is not valid')).not.toBe(null)
		})
	})

	test('updating fulfill -> fulfill', async () => {
		const renderUtils = render(<WrapperUpdateUseAsync />)
		const btn = renderUtils.getByTestId('generate-id')
		let storedId
		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			const idDom = renderUtils.queryByText(/ID: \d+/)
			expect(idDom).not.toBe(null)
			storedId = idDom.textContent
		})

		act(() => {
			fireEvent.click(btn)
		})

		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			const idDom = renderUtils.queryByText(/ID: \d+/)
			expect(idDom).not.toBe(null)
			expect(idDom.textContent).not.toBe(storedId)
		})
	})

	test('updating fulfill -> reject', async () => {
		const renderUtils = render(<WrapperUpdateUseAsync />)
		const btn = renderUtils.getByTestId('generate-error')
		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			expect(renderUtils.queryByText(/ID: \d+/)).not.toBe(null)
		})

		act(() => {
			fireEvent.click(btn)
		})

		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			expect(renderUtils.queryByText('Error: Id is not valid')).not.toBe(null)
		})
	})

	test('updating reject -> fulfill', async () => {
		const renderUtils = render(<WrapperUpdateUseAsync />)
		const btnGenerateId = renderUtils.getByTestId('generate-id')
		const btnGenerateError = renderUtils.getByTestId('generate-error')
		act(() => {
			fireEvent.click(btnGenerateError)
		})

		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			expect(renderUtils.queryByText('Error: Id is not valid')).not.toBe(null)
		})

		act(() => {
			fireEvent.click(btnGenerateId)
		})

		await wait(() => {
			expect(renderUtils.queryByText('Loading')).not.toBe(null)
		})

		await wait(() => {
			expect(renderUtils.queryByText(/ID: \d+/)).not.toBe(null)
		})
	})
})
