import { Button } from 'antd'
import { Link } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../store/store'
import { setUser } from '../../store/user/user.slice'
import s from './Header.module.scss'

export const Header: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isAuth, username, image } = useAuth()

	const handleLogOut = () => {
		localStorage.removeItem('user')
		dispatch(
			setUser({
				email: null,
				token: null,
				username: null,
				image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s'
			})
		)
	}

	return (
		<header className={s.header}>
			<div className={s.container}>
				<Link to='/'>
					<span className={s.logo}>REALWORLD</span>
				</Link>
				{isAuth ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Link to='/new-article'>
							<Button
								style={{
									color: 'rgb(21, 168, 21)',
									fontWeight: '500',
									border: '2px solid rgb(21, 168, 21)'
								}}
							>
								Create article
							</Button>
						</Link>
						<Link to='/profile'>
							<div
								className={s.profile}
								style={{
									display: 'flex',
									alignItems: 'center',
									margin: '0 20px'
								}}
							>
								<span style={{ marginRight: 7 }} className={s.username}>
									{username}
								</span>
								<img
									src={
										image ??
										'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s'
									}
									style={{
										width: 40,
										height: 40,
										borderRadius: '50%'
									}}
									alt={`${username}'s image`}
								/>
							</div>
						</Link>
						<Button
							onClick={handleLogOut}
							style={{
								color: 'rgb(84, 84, 84)',
								fontWeight: '500',
								border: '2px solid rgb(84, 84, 84)'
							}}
						>
							Log out
						</Button>
					</div>
				) : (
					<div>
						<Link to='/sign-in'>
							<Button
								style={{
									marginRight: '1vw'
								}}
								type='text'
							>
								Sign In
							</Button>
						</Link>
						<Link to='/sign-up'>
							<Button
								style={{
									color: 'rgb(21, 168, 21)',
									fontWeight: '500',
									border: '2px solid rgb(21, 168, 21)'
								}}
							>
								Sign Up
							</Button>
						</Link>
					</div>
				)}
			</div>
		</header>
	)
}
