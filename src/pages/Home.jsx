import React, { useEffect } from 'react'
import HomeList from '@Components/HomeList'
import useAsync from '@Hooks/useAsync'
import { getItems as getItemsService } from '@Services/ItemService'

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
