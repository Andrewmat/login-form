import React, { useEffect } from 'react'
import ListItems from '../components/ListItems'
import useAsync from '../hooks/useAsync'
import { getItems as getItemsService } from '../services/ItemService'

export default function Home() {
	const [getItems, itemsReq] = useAsync(getItemsService)

	useEffect(() => {
		const { pending, result, error } = itemsReq
		if (!pending && result == null && error == null) {
			getItems()
		}
	}, [getItems, itemsReq])

	return (
		<>
			<div>Home</div>
			<ListItems
				loading={itemsReq.pending}
				error={itemsReq.error}
				list={itemsReq.result}
			/>
		</>
	)
}
