import React, { lazy, Suspense } from 'react'
import { Router } from '@reach/router'
import Providers from './containers/Providers'
import Login from './pages/Login'
import LoadingPage from './pages/LoadingPage'
const Home = lazy(() => import('./pages/Home'))

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
