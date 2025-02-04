import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getArticles } from './articles.thunk'

interface Article {
	slug: string
	title: string
	description: string
	body: string
	tagList: string[] | null
	createdAt: string
	favoritesCount: number
	favorited: boolean
	author: {
		username: string
		image: string | ''
	}
}

interface ArticlesState {
	articles: Article[]
	articlesCount: number
	loading: boolean
	error: string | null
}

const initialState: ArticlesState = {
	articles: [],
	articlesCount: 0,
	loading: true,
	error: null
}

const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		updateArticle: (state, action: PayloadAction<Article>) => {
			const index = state.articles.findIndex(
				(article) => article.slug === action.payload.slug
			)
			if (index !== -1) {
				state.articles[index] = action.payload
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getArticles.pending, (state) => {
				state.loading = true
			})
			.addCase(getArticles.fulfilled, (state, action) => {
				state.loading = false
				state.articles = action.payload.articles
				state.articlesCount = action.payload.articlesCount
			})
			.addCase(getArticles.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Something went wrong'
			})
	}
})

export const { updateArticle } = articlesSlice.actions
export default articlesSlice.reducer
