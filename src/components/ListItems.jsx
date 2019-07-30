import React from 'react'
import ptype from 'prop-types'
import Item from '@Components/Item'
import styles from './ListItems.module.scss'

export default function ListItems(props) {
	return (
		<ul className={styles.wrapper}>
			{props.list.length > 0 ? (
				props.list.map(item => (
					<li key={item.id}>
						<Item {...item} />
					</li>
				))
			) : (
				<li className={styles.emptyState} data-testid="ListItem-EmptyState">
					No items found
				</li>
			)}
		</ul>
	)
}

ListItems.propTypes = {
	list: ptype.arrayOf(ptype.shape({ id: ptype.string })),
}

ListItems.defaultProps = {
	list: [],
}
