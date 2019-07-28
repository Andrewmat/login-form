import delay from './delay'
import { setCookie } from './CookieService'
import userSrcData from '../data/users.json'

export default {
	authenticate,
}

export async function authenticate(name, password) {
	await delay()
	try {
		const user = userSrcData.find(
			user => user.name === name && user.password === password,
		)
		setCookie('user_p', user.permissions.join(','))
		return user
	} catch (e) {
		throw new Error('Usuário ou senha inválidos')
	}
}
