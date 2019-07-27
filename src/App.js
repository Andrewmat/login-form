import React from 'react'
import { Router } from '@reach/router'
import Providers from './containers/Providers'
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css'

function App() {
	return (
		<Providers>
			<Router>
				<Login path="/" />
				<Home path="/home" />
			</Router>
		</Providers>
	)
}

export default App
