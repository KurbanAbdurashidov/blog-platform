import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getArticles = createAsyncThunk(
	'articles/getArticles',
	async ({ limit, offset }: { limit: number; offset: number }, thunkAPI) => {
		try {
			const response = await axios.get(
				`https://blog-platform.kata.academy/api/articles`,
				{
					params: { limit, offset }
				}
			)
			return response.data
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message)
			}
		}
	}
)
