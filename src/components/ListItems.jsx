import React from 'react'
import Item from './Item'

export default function ListItems(props) {
	if (props.loading) {
		return <div>Carregando lista de items</div>
	}
	if (props.error || !props.list) {
		return (
			<>
				<div>Houve um erro ao tentar carregar a lista de items</div>
				<textarea readOnly value={props.error}></textarea>
			</>
		)
	}
	return (
		<div>
			ListItems
			<div>
				{props.list.map(item => (
					<Item key={item.id} {...item} />
				))}
			</div>
		</div>
	)
}
