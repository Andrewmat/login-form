import delay from '@Services/delay'
import { setCookie, removeCookie } from '@Services/CookieService'
import userSrcData from '@Data/users.json'

export default {
	authenticate,
}

export async function authenticate(name, password) {
	await delay()
	try {
		const user = userSrcData.find(
			user => user.name === name && user.password === password,
		)
		setCookie('logged', 'true')
		setCookie('user_p', user.permissions.join(','))
		return user
	} catch (e) {
		throw new Error('Usuário ou senha inválidos')
	}
}

export async function logout() {
	await delay()
	removeCookie('logged')
	removeCookie('user_p')
}
