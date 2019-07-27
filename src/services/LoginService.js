export default {
	authenticate,
}

export async function authenticate(name, password) {
	const isValid = name === 'andre' && password === '123'
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isValid) {
				resolve(isValid)
			} else {
				reject('Usuário ou senha inválidos')
			}
		}, 2000)
	})
}
