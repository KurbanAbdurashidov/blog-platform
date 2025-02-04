import { Button, Input, Typography } from 'antd'
import axios from 'axios'
import {
	Controller,
	SubmitHandler,
	useFieldArray,
	useForm
} from 'react-hook-form'
import { useNavigate } from 'react-router'
import { ErrorText } from '../../components/ErrorText/ErrorText'
import { VInput } from '../../components/VInput/VInput'
import { useAppSelector } from '../../store/store'
import { newTagList } from '../../utils/article.helper'
import s from './NewArticle.module.scss'

const { Text, Title } = Typography

interface IForm {
	title: string
	description: string
	body: string
	tagList: { tag: string }[]
}

export const NewArticle: React.FC = () => {
	const token = useAppSelector((state) => state.user.token)
	const navigate = useNavigate()

	const { register, control, formState, handleSubmit } = useForm<IForm>({
		mode: 'onChange',
		defaultValues: {
			body: '',
			tagList: [{ tag: '' }]
		}
	})

	const { fields, append, remove } = useFieldArray<IForm>({
		control,
		name: 'tagList'
	})

	const handleOnSubmit: SubmitHandler<IForm> = (data) => {
		handleCreateArticle(data)
	}
	const handleCreateArticle = async (data: IForm) => {
		try {
			await axios.post(
				'https://blog-platform.kata.academy/api/articles',
				{
					article: {
						title: data.title,
						description: data.description,
						body: data.body,
						tagList: newTagList(data.tagList)
					}
				},
				{
					headers: {
						Authorization: `Token ${token}`,
						'Content-Type': 'application/json'
					}
				}
			)
			navigate('/')
		} catch (e) {
			console.error(e)
		}
	}

	const formErrors = {
		title: formState.errors.title?.message,
		description: formState.errors.description?.message,
		text: formState.errors.body?.message
	}

	return (
		<div className={s.newArticle}>
			<div className={s.container}>
				<Title style={{ marginBottom: '30px' }} level={3}>
					Create new article
				</Title>
				<form
					onSubmit={handleSubmit(handleOnSubmit)}
					style={{ width: '100%' }}
				>
					<Text style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
						Title
					</Text>
					<VInput<IForm>
						name='title'
						control={control}
						required='This field is required'
						placeholder='Title'
						validateStatus={formErrors.title}
					/>
					<ErrorText message={formErrors.title} />
					<Text style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
						Description
					</Text>
					<VInput<IForm>
						name='description'
						control={control}
						required='This field is required'
						placeholder='Description'
						validateStatus={formErrors.description}
					/>
					<ErrorText message={formErrors.description} />
					<Text style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
						Text
					</Text>
					<textarea
						className={s.textarea}
						rows={15}
						placeholder='Text'
						{...register('body', { required: true, minLength: 6 })}
					></textarea>
					<ErrorText message={formErrors.text} />
					<Text style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
						Tags
					</Text>
					<div
						style={{
							width: '400px',
							display: 'flex'
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 10
							}}
						>
							{fields.map((field, index) => (
								<div
									key={field.id}
									style={{
										alignSelf: 'flex-start',
										display: 'flex'
									}}
								>
									<Controller
										control={control}
										name={`tagList.${index}.tag`}
										render={({ field }) => (
											<Input
												placeholder='Tag'
												style={{ marginRight: 10 }}
												{...field}
											/>
										)}
									/>
									<Button
										danger
										disabled={fields.length === 1}
										onClick={() => remove(index)}
									>
										Delete
									</Button>
								</div>
							))}
						</div>
						<Button
							style={{
								marginLeft: 10,
								color: 'blue',
								border: '1px solid blue',
								alignSelf: 'flex-end'
							}}
							onClick={() => append({ tag: '' })}
						>
							Add tag
						</Button>
					</div>
					<Button
						style={{
							marginTop: '20px',
							width: '300px',
							alignSelf: 'flex-start'
						}}
						type='primary'
						htmlType='submit'
					>
						Send
					</Button>
				</form>
			</div>
		</div>
	)
}
