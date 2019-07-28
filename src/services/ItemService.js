import { getUserPermissions } from './CookieService'
import itemsSrcData from '../data/items.json'
import delay from './delay'

export default {
	getItems,
	getItem,
}

export async function getItems() {
	await delay()
	try {
		const permissions = getUserPermissions()
		const finalItems = itemsSrcData
			// filtering out all items that should not be acessed
			.filter(item => permissions.includes(item.permitLvl))
			// removing details so it can emulate a "light" request
			.map(item => ({
				...item,
				details: {},
			}))
		return finalItems
	} catch (e) {
		console.error(e)
		throw new Error('Aconteceu algo de errado :(')
	}
}

export function getItem(id) {}
