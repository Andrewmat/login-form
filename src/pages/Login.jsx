import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import LoginForm from '../components/LoginForm'
import useAsync from '../hooks/useAsync'
import { authenticate as serviceAuthenticate } from '../services/LoginService'

export default function Login() {
	const [auth, { pending, result, error }] = useAsync(serviceAuthenticate)

	function onSubmit({ name, password }) {
		auth(name, password)
	}
	useEffect(() => {
		if (result && result.name && result.permissions) {
			navigate('/home')
		}
	}, [result])

	return (
		<LoginForm
			onSubmit={onSubmit}
			pending={pending}
			error={error && !pending ? error.message : undefined}
		/>
	)
}
