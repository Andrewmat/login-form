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
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Login Form</h2>
			<form onSubmit={onSubmit} className={styles.form}>
				<div className={styles.inputWrapper}>
					<Input
						label="Username"
						type="text"
						onChange={onNameChange}
						value={name}
						className={styles.input}
					/>
					<Input
						label="Password"
						type="password"
						onChange={onPasswordChange}
						value={password}
						className={styles.input}
					/>
				</div>
				<button
					type="submit"
					disabled={props.pending}
					className={styles.submit}
				>
					{props.pending ? '...' : 'Sign In'}
				</button>
				{props.error && (
					<span className={styles.errorMessage}>{props.error}</span>
				)}
			</form>
		</div>
	)
}
