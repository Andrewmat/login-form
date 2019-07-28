import React from 'react'
import Item from './Item'

export default function ListItems(props) {
	return (
		<div>
			<h2>Lista de items</h2>
			<ul>
				{props.list.length > 0 ? (
					props.list.map(item => (
						<li key={item.id}>
							<Item {...item} />
						</li>
					))
				) : (
					<div data-testid="ListItem-EmptyState">Nenhum item encontrado</div>
				)}
			</ul>
		</div>
	)
}

ListItems.defaultProps = {
	list: [],
}
