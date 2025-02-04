import { Button, Typography } from 'antd'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ErrorText } from '../../components/ErrorText/ErrorText'
import { VInput } from '../../components/VInput/VInput'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { setUser } from '../../store/user/user.slice'
import s from './Profile.module.scss'

const { Title, Text } = Typography

interface IForm {
	username: string
	email: string
	password: string
	image: string
}

interface IUserData {
	username: string
	email: string
	image: string
}

export const Profile: React.FC = () => {
	const dispatch = useAppDispatch()
	const token = useAppSelector((state) => state.user.token)
	const [userData, setUserData] = useState<IUserData | null>(null)

	const { handleSubmit, formState, reset, control, setValue } = useForm<IForm>(
		{
			mode: 'onChange'
		}
	)

	const getCurrentUser = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`https://blog-platform.kata.academy/api/user`,
				{
					headers: {
						Authorization: `Token ${token}`
					}
				}
			)
			setUserData(data.user)
		} catch (error) {
			console.error(error)
		}
	}, [token])

	const updateCurrentUser = async (
		username: string,
		email: string,
		image: string
	) => {
		try {
			const { data } = await axios.put(
				`https://blog-platform.kata.academy/api/user`,
				{
					user: {
						username,
						email,
						image
					}
				},
				{
					headers: {
						Authorization: `Token ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			setUserData(data.user)
			dispatch(setUser(data.user))
			localStorage.setItem('user', JSON.stringify(data.user))
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (token) {
			getCurrentUser()
		}
	}, [token, getCurrentUser])

	useEffect(() => {
		if (userData) {
			setValue('username', userData.username)
			setValue('email', userData.email)
			setValue('image', userData.image)
		}
	}, [setValue, userData])

	const handleOnSubmit: SubmitHandler<IForm> = (data) => {
		reset()
		updateCurrentUser(data.username, data.email, data.image)
	}

	return (
		<div className={s.profile}>
			<div className={s.container}>
				<Title style={{ marginBottom: '30px' }} level={3}>
					Edit Profile
				</Title>
				<form onSubmit={handleSubmit(handleOnSubmit)}>
					<Text>Username</Text>
					<VInput<IForm>
						name='username'
						control={control}
						defaultValue={userData?.username}
						required={false}
						patternValue={/^[A-Z0-9._-]{5,}$/i}
						patternMessage='Enter a correct username'
						placeholder='Username'
						validateStatus={formState.errors.username?.message}
					/>
					<ErrorText message={formState.errors.username?.message} />
					<Text style={{ marginTop: '10px' }}>Email</Text>
					<VInput<IForm>
						name='email'
						control={control}
						defaultValue={userData?.email}
						required={false}
						patternValue={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
						patternMessage='Enter a correct email'
						placeholder='Email'
						validateStatus={formState.errors.email?.message}
					/>
					<ErrorText message={formState.errors.email?.message} />
					<Text style={{ marginTop: '10px' }}>New password</Text>
					<VInput<IForm>
						name='password'
						control={control}
						required={false}
						patternValue={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
						patternMessage='Enter a correct password'
						placeholder='New password'
						isPassword
						validateStatus={formState.errors.password?.message}
					/>
					<ErrorText message={formState.errors.password?.message} />
					<Text style={{ marginTop: '10px' }}>Avatar image (url)</Text>
					<VInput<IForm>
						name='image'
						control={control}
						defaultValue={userData?.image}
						required={false}
						patternMessage='Enter a correct url'
						placeholder='Avatar image'
						validateStatus={formState.errors.image?.message}
					/>
					<ErrorText message={formState.errors.image?.message} />
					<Button
						type='primary'
						style={{ width: '300px', marginTop: 10 }}
						htmlType='submit'
					>
						Save
					</Button>
				</form>
			</div>
		</div>
	)
}
