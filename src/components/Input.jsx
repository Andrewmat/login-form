import React from 'react'
import classnames from 'classnames'
import styles from './Input.module.scss'

export default function Input(props) {
	const inputClassName = React.useMemo(() => {
		return classnames(styles.input, props.className)
	}, [props.className])

	function inputProps() {
		let result = { ...props }
		result.className = inputClassName
		;['label', 'labelClassName'].forEach(propToDelete => {
			delete result[propToDelete]
		})
		return result
	}
	return (
		<label className={styles.wrapper}>
			<span className={classnames(styles.label, props.labelClassName)}>
				{props.label}
			</span>
			<input {...inputProps()} />
		</label>
	)
}
