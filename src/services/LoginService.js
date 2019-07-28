import delay from './delay'
import { setCookie } from './CookieService'
import userSrcData from '../data/users.json'

export default {
	authenticate,
}

export async function authenticate(name, password) {
	await delay()
	return new Promise((resolve, reject) => {
		const user = userSrcData.find(
			user => user.name === name && user.password === password,
		)
		if (user) {
			const { name, permissions } = user
			setCookie('user_p', permissions.join(','))
			resolve({ name, permissions })
		} else {
			reject('Usuário ou senha inválidos')
		}
	})
}
