import { useEffect } from 'react'
import { navigate } from '@reach/router'
import { isLogged } from '@Services/CookieService'

export default function useAuthRedirect(route, expected = false) {
	useEffect(() => {
		const logged = isLogged()
		if (logged !== expected) {
			navigate(route)
		}
	}, [expected, route])
}
