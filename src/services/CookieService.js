export default {
	setCookie,
	getCookie,
	getUserPermissions,
}

export function setCookie(key, value) {
	let finalValue = value
	if (typeof finalValue !== 'string') {
		finalValue = JSON.stringify(value)
	}
	document.cookie = `${key}=${finalValue}`
}

export function getCookie(key) {
	const cookie = document.cookie.split(';').find(c => {
		const currKey = c.split('=')[0].trim()
		return key === currKey
	})
	if (cookie) {
		return cookie.split('=').map(s => s.trim())[1]
	} else {
		return undefined
	}
}
export function removeCookie(key) {
	const expires = new Date(Date.now() - 1000 * 60 * 60).toString()
	setCookie(key, `;expires=${expires}`)
}

export function isLogged() {
	return getCookie('logged') === 'true'
}

export function getUserPermissions() {
	const strPermission = getCookie('user_p')
	if (!strPermission) {
		throw new Error(`É necessário estar logado`)
	}
	return strPermission.split(',')
}
