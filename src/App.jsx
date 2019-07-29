import React, { lazy, Suspense } from 'react'
import { Router } from '@reach/router'
import Providers from '@Containers/Providers'
import Login from '@Pages/Login'
import LoadingPage from '@Pages/LoadingPage'
import '_main.scss'

const Home = lazy(() => import('@Pages/Home'))

function App() {
	return (
		<Providers>
			<Suspense fallback={<LoadingPage />}>
				<Router>
					<Login path="/" />
					<Home path="/home" />
				</Router>
			</Suspense>
		</Providers>
	)
}

export default App
