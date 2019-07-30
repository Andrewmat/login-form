import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import HomeList from '@Components/HomeList'
import useAsync from '@Hooks/useAsync'
import useAuthRedirect from '@Hooks/useAuthRedirect'
import { getItems as getItemsService } from '@Services/ItemService'
import { logout } from '@Services/LoginService'
import styles from './Home.module.scss'

export default function Home() {
	useAuthRedirect('/', true)
	const [getItems, itemsReq] = useAsync(getItemsService)

	useEffect(() => {
		const { pending, result, error } = itemsReq
		if (!pending && result == null && error == null) {
			getItems()
		}
	}, [getItems, itemsReq])

	async function onLogoutClick() {
		await logout()
		navigate('/')
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>
				<h1 className={styles.title}>Home</h1>
				<button type="button" className={styles.logout} onClick={onLogoutClick}>
					Logout
				</button>
			</div>
			<HomeList
				loading={itemsReq.pending}
				error={itemsReq.error && itemsReq.error.message}
				list={itemsReq.result}
				className={styles.list}
			/>
		</div>
	)
}
