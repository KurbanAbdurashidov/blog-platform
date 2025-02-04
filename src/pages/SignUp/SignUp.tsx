import { Button, Divider, Typography } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { ErrorText } from '../../components/ErrorText/ErrorText'
import { LoadingSpin } from '../../components/LoadingSpin/LoadingSpin'
import { VCheckbox } from '../../components/VCheckbox/VCheckbox'
import { VInput } from '../../components/VInput/VInput'
import { useAppDispatch } from '../../store/store'
import { setUser } from '../../store/user/user.slice'
import s from './SignUp.module.scss'

const { Title, Text } = Typography

interface IForm {
	username: string
	email: string
	password: string
	confirmPassword: string
	agree: boolean
}

export const SignUp: React.FC = () => {
	const dispatch = useAppDispatch()

	const [isLoading, setIsLoading] = useState(true)

	const { handleSubmit, formState, reset, control, watch } = useForm<IForm>({
		mode: 'onChange'
	})

	const password = watch('password')

	const formErrors = {
		username: formState.errors.username?.message,
		email: formState.errors.email?.message,
		password: formState.errors.password?.message,
		confirmPassword: formState.errors.confirmPassword?.message
	}

	const onSubmit: SubmitHandler<IForm> = (data) => {
		const { email, password, username } = data
		reset()
		handleSignUp(email, password, username)
	}

	const handleSignUp = async (
		email: string,
		password: string,
		username: string
	) => {
		try {
			const response = await axios.post(
				'https://blog-platform.kata.academy/api/users',
				{
					user: {
						email,
						password,
						username,
						image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s'
					}
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			dispatch(
				setUser({
					email: response.data.user.email,
					token: response.data.user.token,
					username: response.data.user.username,
					image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s'
				})
			)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		setTimeout(() => setIsLoading(false), 500)
	}, [])

	return (
		<>
			{isLoading ? (
				<LoadingSpin />
			) : (
				<div className={s.signUp}>
					<div className={s.container}>
						<Title style={{ marginBottom: '30px' }} level={3}>
							Create Account
						</Title>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Text>Username</Text>
							<VInput<IForm>
								name='username'
								control={control}
								required='This field is required'
								patternValue={/^[A-Z0-9._-]{5,}$/i}
								patternMessage='Enter a correct username'
								placeholder='Username'
								validateStatus={formErrors.username}
							/>
							<ErrorText message={formErrors.username} />
							<Text style={{ marginTop: '10px' }}>Email</Text>
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
							<Text style={{ marginTop: '10px' }}>Repeat password</Text>
							<VInput<IForm>
								name='confirmPassword'
								control={control}
								required='This field is required'
								patternValue={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
								patternMessage='The password must contain at least 8 characters, one letter and one number'
								placeholder='Password'
								isPassword
								validate={(value) =>
									value === password || 'Passwords do not match'
								}
								validateStatus={formErrors.confirmPassword}
							/>
							<ErrorText message={formErrors.confirmPassword} />
							<Divider style={{ margin: '15px 0' }} />
							<div className={s.agreement}>
								<VCheckbox
									name='agree'
									control={control}
									defaultValue={false}
									required='This field is required'
								/>
								<Text style={{ marginLeft: 7 }}>
									I agree to the processing of my personal information
								</Text>
							</div>
							<Button
								type='primary'
								style={{ width: '300px' }}
								htmlType='submit'
							>
								Create an account
							</Button>
						</form>
						<Text
							style={{
								marginTop: '10px',
								fontSize: '12px',
								color: 'gray'
							}}
						>
							Already have an account? <Link to='/sign-in'>Sign In</Link>
						</Text>
					</div>
				</div>
			)}
		</>
	)
}
