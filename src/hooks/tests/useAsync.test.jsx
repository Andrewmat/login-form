import { act, wait } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import useAsync from '../useAsync'

describe('useAsync', () => {
	test('returns a function and the promise initial state', () => {
		const mockFunction = async () => 'value'

		const renderUtils = renderHook(() => useAsync(mockFunction))
		const [returnedFunction, promiseState] = renderUtils.result.current

		expect(returnedFunction).toBeInstanceOf(Function)
		expect(promiseState).toMatchObject({
			pending: false,
			result: undefined,
			error: undefined,
		})
	})

	test('updates state when function is ran and resolved successfully', async () => {
		let continueAsync = false
		const response = { code: 200, data: { ok: true } }
		const mockFunction = async () => {
			return new Promise(resolve => {
				setInterval(() => {
					if (continueAsync) {
						resolve(response)
						continueAsync = false
					}
				}, 100)
			})
		}

		const renderUtils = renderHook(() => useAsync(mockFunction))
		const { result } = renderUtils
		expect(result.current[1].pending).toBe(false)

		act(() => result.current[0]())
		expect(result.current[1].pending).toBe(true)

		act(() => (continueAsync = true))

		await wait(() => expect(result.current[1].result).toBe(response))
		expect(result.current[1].pending).toBe(false)
		expect(result.current[1].error).toBeUndefined()
	})

	test('updates state when function is ran and rejected with error', async () => {
		let continueAsync = false
		const response = { code: 500, data: { ok: false } }
		const mockFunction = async () => {
			return new Promise((_, reject) => {
				setInterval(() => {
					if (continueAsync) {
						reject(response)
						continueAsync = false
					}
				}, 100)
			})
		}

		const renderUtils = renderHook(() => useAsync(mockFunction))
		const { result } = renderUtils
		expect(result.current[1].pending).toBe(false)
		act(() => result.current[0]())
		expect(result.current[1].pending).toBe(true)

		act(() => (continueAsync = true))

		await wait(() => expect(result.current[1].error).toBe(response))
		expect(result.current[1].pending).toBe(false)
		expect(result.current[1].result).toBeUndefined()
	})
})
