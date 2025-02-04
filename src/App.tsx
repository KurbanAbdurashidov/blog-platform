import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Header } from './components/Header/Header'
import { Article } from './pages/Article/Article'
import { EditArticle } from './pages/EditArticle/EditArticle'
import { Home } from './pages/Home/Home'
import { NewArticle } from './pages/NewArticle/NewArticle'
import { Profile } from './pages/Profile/Profile'
import { SignIn } from './pages/SignIn/SignIn'
import { SignUp } from './pages/SignUp/SignUp'
import { useAppDispatch } from './store/store'
import { setUser } from './store/user/user.slice'

export const App: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const userData = localStorage.getItem('user')
		if (userData) {
			const parsedUserData = JSON.parse(userData)
			dispatch(setUser(parsedUserData))
		}
	}, [dispatch])

	return (
		<>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path='articles' element={<Home />} />
				<Route path='new-article' element={<NewArticle />} />
				<Route path='articles/:slug' element={<Article />} />
				<Route path='articles/:slug/edit' element={<EditArticle />} />
				<Route path='sign-in' element={<SignIn />} />
				<Route path='sign-up' element={<SignUp />} />
				<Route path='profile' element={<Profile />} />
			</Routes>
		</>
	)
}
