import React, { useState, useMemo } from 'react'
import ptype from 'prop-types'
import ListItems from '@Components/ListItems'
import Input from '@Components/Input'
import Loading from '@Components/Loading'
import styles from './HomeList.module.scss'

export default function HomeList(props) {
	const [term, setTerm] = useState('')
	const filteredList = useMemo(
		() =>
			(props.list || []).filter(item =>
				item.name.toLowerCase().includes(term.toLowerCase()),
			),
		[props.list, term],
	)
	function onTermChange(e) {
		setTerm(e.target.value)
	}

	if (props.loading) {
		return <Loading />
	}
	if (props.error) {
		return (
			<div className={styles.errorWrapper}>
				<h2>There was an error when loading the items list</h2>
				<textarea readOnly value={props.error}></textarea>
			</div>
		)
	}

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Items List</h2>
			<Input
				label="Search"
				type="search"
				onChange={onTermChange}
				value={term}
				className={styles.searchInput}
			/>
			<ListItems list={filteredList} />
		</div>
	)
}

HomeList.propTypes = {
	list: ptype.array,
	loading: ptype.bool,
	error: ptype.string,
}

HomeList.defaultProps = {
	list: [],
	loading: false,
	error: '',
}
