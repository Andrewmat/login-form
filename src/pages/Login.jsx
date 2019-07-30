import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import LoginForm from '@Components/LoginForm'
import useAsync from '@Hooks/useAsync'
import useAuthRedirect from '@Hooks/useAuthRedirect'
import { authenticate as serviceAuthenticate } from '@Services/LoginService'
import styles from './Login.module.scss'

export default function Login() {
	useAuthRedirect('/home')

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
		<div className={styles.wrapper}>
			<LoginForm
				onSubmit={onSubmit}
				pending={pending}
				error={error && !pending ? error.message : undefined}
			/>
		</div>
	)
}
