import React, { useState, useMemo } from 'react'
import ListItems from './ListItems'
import Input from './Input'

export default function HomeList(props) {
	const [term, setTerm] = useState('')
	const filteredList = useMemo(
		() =>
			(props.list || []).filter(item => item.name.toLowerCase().includes(term)),
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
				type="text"
				onChange={onTermChange}
				value={term}
			/>
			<ListItems list={filteredList} />
		</div>
	)
}
