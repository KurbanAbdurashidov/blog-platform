import { Button, Typography } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { ErrorText } from '../../components/ErrorText/ErrorText'
import { LoadingSpin } from '../../components/LoadingSpin/LoadingSpin'
import { VInput } from '../../components/VInput/VInput'
import { useAppDispatch } from '../../store/store'
import { setUser } from '../../store/user/user.slice'
import s from './SignIn.module.scss'

const { Title, Text } = Typography

export interface IForm {
	email: string
	password: string
	username: string
	image: string
}

export const SignIn: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const { handleSubmit, formState, reset, control } = useForm<IForm>({
		mode: 'onChange'
	})

	const handleOnSubmit: SubmitHandler<IForm> = async ({
		email,
		password,
		username,
		image
	}) => {
		try {
			await handleSignIn(email, password, username, image)
			reset()
		} catch (error) {
			console.error(error)
		}
	}

	const handleSignIn = async (
		email: string,
		password: string,
		username: string,
		image: string
	) => {
		try {
			const response = await axios.post(
				'https://blog-platform.kata.academy/api/users/login',
				{
					user: {
						email,
						password,
						username,
						image
					}
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			localStorage.setItem(
				'user',
				JSON.stringify({
					email: response.data.user.email,
					token: response.data.user.token,
					username: response.data.user.username,
					image: response.data.user.image
				})
			)
			dispatch(
				setUser({
					email: response.data.user.email,
					token: response.data.user.token,
					username: response.data.user.username,
					image: response.data.user.image
				})
			)
			navigate('/')
		} catch (error) {
			console.error(error)
		}
	}

	const formErrors = {
		email: formState.errors.email?.message,
		password: formState.errors.password?.message
	}

	useEffect(() => {
		setTimeout(() => setIsLoading(false), 500)
	}, [])

	return (
		<>
			{isLoading ? (
				<LoadingSpin />
			) : (
				<div className={s.signIn}>
					<div className={s.container}>
						<Title style={{ marginBottom: '30px' }} level={3}>
							Sign In
						</Title>
						<form onSubmit={handleSubmit(handleOnSubmit)}>
							<Text>Email</Text>
							<VInput<IForm>
								name='email'
								control={control}
								required='This field is required'
								patternValue={
									/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
								}
								patternMessage='Enter a correct email'
								placeholder='Email'
								validateStatus={formErrors.email}
							/>
							<ErrorText message={formErrors.email} />
							<Text style={{ marginTop: '10px' }}>Password</Text>
							<VInput<IForm>
								name='password'
								control={control}
								required='This field is required'
								patternValue={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
								patternMessage='The password must contain at least 8 characters, one letter and one number'
								placeholder='Password'
								isPassword
								validateStatus={formErrors.password}
							/>
							<ErrorText message={formErrors.password} />
							<Button
								type='primary'
								style={{ width: '300px', marginTop: 10 }}
								htmlType='submit'
							>
								Sign In
							</Button>
						</form>
						<Text
							style={{
								marginTop: '10px',
								fontSize: '12px',
								color: 'gray'
							}}
						>
							Don't have an account? <Link to='/sign-up'>Sign Up</Link>
						</Text>
					</div>
				</div>
			)}
		</>
	)
}
