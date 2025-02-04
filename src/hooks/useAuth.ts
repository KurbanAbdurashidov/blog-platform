import { useAppSelector } from '../store/store'

export function useAuth() {
	const { email, token, username, image } = useAppSelector(
		(state) => state.user
	)

	return {
		isAuth: !!email,
		email,
		token,
		username,
		image
	}
}
