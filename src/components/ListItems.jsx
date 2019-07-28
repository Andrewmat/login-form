import React from 'react'
import Item from './Item'

export default function ListItems(props) {
	return (
		<div>
			<h2>Lista de items</h2>
			<div>
				{props.list.map(item => (
					<Item key={item.id} {...item} />
				))}
			</div>
		</div>
	)
}

ListItems.defaultProps = {
	list: [],
}
