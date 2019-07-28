import React, { useEffect } from 'react'
import HomeList from '../components/HomeList'
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
		<div>
			<h1>Home</h1>
			<HomeList
				loading={itemsReq.pending}
				error={itemsReq.error}
				list={itemsReq.result}
			/>
		</div>
	)
}
