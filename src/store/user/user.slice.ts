import { createSlice } from '@reduxjs/toolkit'

interface UserState {
	email: string | null
	token: string | null
	username: string | null
	image: string | null
}

const initialState: UserState = {
	email: null,
	token: null,
	username: null,
	image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s'
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email
			state.token = action.payload.token
			state.username = action.payload.username
			state.image = action.payload.image
		},
		logout(state) {
			state.email = null
			state.token = null
			state.username = null
			state.image =
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZsL6PVn0SNiabAKz7js0QknS2ilJam19QQ&s'
		}
	}
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
