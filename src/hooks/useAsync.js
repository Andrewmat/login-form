import React from 'react'

const initialState = {
	pending: false,
	result: undefined,
	error: undefined,
}

function reducer(state, [type, payload]) {
	switch (type) {
		case 'request':
			return { ...state, pending: true }
		case 'fulfill':
			return { ...state, result: payload, pending: false }
		case 'reject':
			return { ...state, error: payload, pending: false }
		case 'cancel':
			return { ...state, pending: false, error: new Error('Canceled request') }
		default:
			throw new Error(`Action type ${type} is not defined`)
	}
}

export default function useAsync(asyncFunc, onCancel) {
	const [state, dispatch] = React.useReducer(reducer, initialState)
	const cancelled = React.useRef(false)
	const callback = React.useCallback(
		(...args) => {
			run()
			async function run() {
				const promise = asyncFunc(...args)
				if (!cancelled.current) dispatch(['request'])
				try {
					const response = await promise
					if (!cancelled.current) dispatch(['fulfill', response])
				} catch (error) {
					if (!cancelled.current) dispatch(['reject', error])
				}
			}
			return () => {
				cancelled.current = true
				if (onCancel) onCancel()
				dispatch(['cancel'])
			}
		},
		[asyncFunc, onCancel],
	)

	return [callback, state]
}
