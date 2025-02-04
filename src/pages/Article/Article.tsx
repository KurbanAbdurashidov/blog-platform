import { Button, Popconfirm, Tag } from 'antd'
import axios from 'axios'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate, useParams } from 'react-router'
import remarkGfm from 'remark-gfm'
import { LoadingSpin } from '../../components/LoadingSpin/LoadingSpin'
import { useAppSelector } from '../../store/store'
import {
	formatDate,
	formatDescription,
	formatUsername
} from '../../utils/article.helper'
import s from './Article.module.scss'

type Article = {
	slug: string
	title: string
	description: string
	body: string
	favoritesCount: number
	tagList: string[] | null
	createdAt: string
	author: {
		username: string
		image: string | ''
	}
} | null

export const Article: React.FC = () => {
	const { slug } = useParams<{ slug: string }>()
	const [article, setArticle] = useState<Article>(null)
	const [isLoading, setIsLoading] = useState(true)

	const token = useAppSelector((state) => state.user.token)
	const navigate = useNavigate()

	const username = useAppSelector((state) => state.user.username)
	const isAuthor = article?.author.username === username

	useEffect(() => {
		const getArticle = async () => {
			try {
				const response = await axios.get(
					`https://blog-platform.kata.academy/api/articles/${slug}`
				)
				setArticle(response.data.article)
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message)
				}
			} finally {
				setIsLoading(false)
			}
		}

		getArticle()
	}, [slug])

	const deleteArticle = async () => {
		try {
			await axios.delete(
				`https://blog-platform.kata.academy/api/articles/${slug}`,
				{
					headers: {
						Authorization: `Token ${token}`
					}
				}
			)
			navigate('/')
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<>
			{article ? (
				isLoading ? (
					<LoadingSpin />
				) : (
					<div className={s.fullArticle}>
						<div className={s.articleBody}>
							<div className={s.headerBody}>
								<h2 className={s.title}>{article.title}</h2>
								<button className={s.favoritesCount}>
									<Heart size={16} strokeWidth={1.25} />
									{article.favoritesCount}
								</button>
								<div className={s.tagsInfo}>
									{article.tagList?.map((tag, index) => (
										<Tag key={`${tag}-${index}`}>{tag}</Tag>
									))}
								</div>
								<p className={s.description}>
									{formatDescription(article.description)}
								</p>
							</div>
							<div className={s.author}>
								<div className={s.authorContainer}>
									<div className={s.authorBody}>
										<span className={s.user}>
											{formatUsername(article.author.username)}
										</span>
										<span className={s.createdAt}>
											{formatDate(article.createdAt)}
										</span>
									</div>
									<img
										className={s.avatar}
										src={article.author.image}
										alt={`${article.author.username}'s avatar`}
									/>
								</div>
								{isAuthor && (
									<div className={s.editDelete}>
										<Popconfirm
											title='Are you sure to delete this article?'
											onConfirm={deleteArticle}
											okText='Yes'
											cancelText='No'
										>
											<Button danger>Delete</Button>
										</Popconfirm>
										<Link to={`/articles/${article.slug}/edit`}>
											<Button
												style={{
													color: 'rgb(21, 168, 21)',
													fontWeight: '500',
													border: '1px solid rgb(21, 168, 21)',
													marginLeft: 5
												}}
											>
												Edit
											</Button>
										</Link>
									</div>
								)}
							</div>
						</div>
						<ReactMarkdown
							className={s.markdown}
							remarkPlugins={[remarkGfm]}
						>
							{article.body}
						</ReactMarkdown>
					</div>
				)
			) : (
				<LoadingSpin />
			)}
		</>
	)
}
