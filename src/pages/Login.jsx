import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import LoginForm from '../components/LoginForm'
import useAsync from '../hooks/useAsync'
import { authenticate as serviceAuthenticate } from '../services/LoginService'

export default function Login() {
	const [auth, authState] = useAsync(serviceAuthenticate)

	function onSubmit({ name, password }) {
		auth(name, password)
	}
	useEffect(() => {
		if (authState.result === true) {
			navigate('/home')
		}
	}, [authState])

	return (
		<LoginForm
			onSubmit={onSubmit}
			pending={authState.pending}
			error={authState.error}
		/>
	)
}
