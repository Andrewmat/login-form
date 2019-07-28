import React from 'react'
import Input from '@Components/Input'
import styles from './LoginForm.module.scss'

export default function(props) {
	const [name, setName] = React.useState('')
	const [password, setPassword] = React.useState('')

	function onNameChange(e) {
		setName(e.target.value)
	}
	function onPasswordChange(e) {
		setPassword(e.target.value)
	}
	function onSubmit(e) {
		e.preventDefault()
		if (props.onSubmit) {
			props.onSubmit({ name, password }, e)
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<Input
				label="Username"
				type="text"
				onChange={onNameChange}
				value={name}
			/>
			<Input
				label="Password"
				type="password"
				onChange={onPasswordChange}
				value={password}
			/>
			<button type="submit" disabled={props.pending}>
				Enviar
			</button>
			{props.error && (
				<span className={styles.errorMessage}>{props.error}</span>
			)}
		</form>
	)
}
