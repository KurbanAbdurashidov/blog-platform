import { Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import { LoadingSpin } from '../../components/LoadingSpin/LoadingSpin'
import { getArticles } from '../../store/articles/articles.thunk'
import { useAppDispatch, useAppSelector } from '../../store/store'
import s from './Home.module.scss'

export const Home: React.FC = () => {
	const dispatch = useAppDispatch()
	const articles = useAppSelector((state) => state.articles.articles)
	const articlesCount = useAppSelector((state) => state.articles.articlesCount)
	const loading = useAppSelector((state) => state.articles.loading)

	const [currentPage, setCurrentPage] = useState(1)

	const limit = 10

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		const offset = limit * (page - 1)
		dispatch(getArticles({ limit, offset }))
	}

	useEffect(() => {
		dispatch(getArticles({ limit, offset: 0 }))
	}, [dispatch])

	return (
		<div className={s.home}>
			<div className={s.container}>
				{loading ? (
					<LoadingSpin />
				) : (
					<ul className={s.articlesList}>
						{articles.map((article) => (
							<ArticleCard
								key={article.slug}
								slug={article.slug}
								title={article.title}
								description={article.description}
								favoritesCount={article.favoritesCount}
								favorited={article.favorited}
								tagList={article.tagList}
								createdAt={article.createdAt}
								username={article.author.username}
								image={article.author.image}
							/>
						))}
						<Pagination
							style={{ marginTop: 30 }}
							total={articlesCount}
							onChange={handlePageChange}
							pageSize={limit}
							current={currentPage}
							showSizeChanger={false}
						/>
					</ul>
				)}
			</div>
		</div>
	)
}
