import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router'
import { App } from './App.tsx'
import './firebase.ts'
import './index.scss'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</StrictMode>
)
