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
		return cookie.split('=').map(s => s.trim())
	} else {
		return undefined
	}
}
export function getUserPermissions() {
	const cookiePermission = getCookie('user_p')
	if (!cookiePermission) {
		throw new Error(`É necessário estar logado`)
	}
	const [, strPermission] = cookiePermission
	return strPermission.split(',')
}
