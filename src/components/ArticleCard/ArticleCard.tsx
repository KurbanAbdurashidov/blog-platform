import { Tag } from 'antd'
import axios from 'axios'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { updateArticle } from '../../store/articles/articles.slice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
	formatDate,
	formatDescription,
	formatTag,
	formatTagList,
	formatTitle,
	formatUsername
} from '../../utils/article.helper'
import s from './ArticleCard.module.scss'

interface Props {
	slug: string
	title: string
	description: string
	favoritesCount: number
	favorited: boolean
	tagList: string[] | null
	createdAt: string
	username: string
	image: string | ''
}

export const ArticleCard: React.FC<Props> = ({
	slug,
	title,
	description,
	favoritesCount,
	favorited,
	tagList,
	createdAt,
	username,
	image
}) => {
	const [localFavorites, setLocalFavorites] = useState(favoritesCount)
	const [isFavorited, setIsFavorited] = useState(favorited)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const token = useAppSelector((state) => state.user.token)

	const handleArticleClick = (slug: string) => {
		navigate(`/articles/${slug}`)
	}

	useEffect(() => {
		setIsFavorited(favorited)
		setLocalFavorites(favoritesCount)
	}, [favorited, favoritesCount])

	const handleFavoriteClick = async () => {
		try {
			if (!isFavorited) {
				const response = await axios.post(
					`https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
					{},
					{
						headers: {
							Authorization: `Token ${token}`
						}
					}
				)
				console.log(response)
				dispatch(updateArticle(response.data.article))

				setLocalFavorites(response.data.article.favoritesCount)
				setIsFavorited(response.data.article.favorited)
			} else {
				const response = await axios.delete(
					`https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
					{
						headers: {
							Authorization: `Token ${token}`
						}
					}
				)
				console.log(response)
				dispatch(updateArticle(response.data.article))

				setLocalFavorites(response.data.article.favoritesCount)
				setIsFavorited(response.data.article.favorited)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<li className={s.card}>
			<div className={s.body}>
				<h2 className={s.title} onClick={() => handleArticleClick(slug)}>
					{formatTitle(title)}
				</h2>
				<button onClick={handleFavoriteClick} className={s.favoritesCount}>
					<Heart
						size={16}
						strokeWidth={1.25}
						fill={isFavorited ? 'red' : 'none'}
						color={isFavorited ? 'red' : 'gray'}
					/>
					{localFavorites}
				</button>
				<div className={s.tagList}>
					{formatTagList(tagList)?.map((tag, index) => (
						<Tag key={`${tag}-${index}`}>{formatTag(tag)}</Tag>
					))}
				</div>
				<p className={s.description}>{formatDescription(description)}</p>
			</div>
			<div className={s.author}>
				<div className={s.authorBody}>
					<span className={s.username}>{formatUsername(username)}</span>
					<span className={s.createdAt}>{formatDate(createdAt)}</span>
				</div>
				<img
					className={s.avatar}
					src={image}
					alt={`${username}'s avatar`}
				/>
			</div>
		</li>
	)
}
