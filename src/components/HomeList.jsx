import React, { useState, useMemo } from 'react'
import ptype from 'prop-types'
import ListItems from '@Components/ListItems'
import Input from '@Components/Input'

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
		return <div>Carregando lista de items</div>
	}
	if (props.error) {
		return (
			<div>
				<h2>Houve um erro ao tentar carregar a lista de items</h2>
				<textarea readOnly value={props.error}></textarea>
			</div>
		)
	}

	return (
		<div>
			<Input
				label="Filtrar lista"
				type="search"
				onChange={onTermChange}
				value={term}
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
