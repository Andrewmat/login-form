import React, { useEffect } from 'react'
import HomeList from '@Components/HomeList'
import useAsync from '@Hooks/useAsync'
import { getItems as getItemsService } from '@Services/ItemService'
import styles from './Home.module.scss'

export default function Home() {
	const [getItems, itemsReq] = useAsync(getItemsService)

	useEffect(() => {
		const { pending, result, error } = itemsReq
		if (!pending && result == null && error == null) {
			getItems()
		}
	}, [getItems, itemsReq])

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>Home</h1>
			<HomeList
				loading={itemsReq.pending}
				error={itemsReq.error && itemsReq.error.message}
				list={itemsReq.result}
			/>
		</div>
	)
}
