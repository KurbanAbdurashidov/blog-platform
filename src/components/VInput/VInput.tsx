import { Input } from 'antd'
import {
	Control,
	Controller,
	FieldValues,
	Path,
	PathValue
} from 'react-hook-form'

interface VInputProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	defaultValue?: PathValue<T, Path<T>>
	required: boolean | string
	patternValue?: RegExp
	patternMessage?: string
	placeholder: string
	isPassword?: boolean
	validate?: (value: PathValue<T, Path<T>>) => true | string | undefined
	validateStatus: string | undefined
	style?: Record<string, string | number>
}

export const VInput = <T extends FieldValues>({
	name,
	control,
	defaultValue,
	required,
	patternValue,
	patternMessage,
	placeholder,
	isPassword,
	validate,
	validateStatus,
	style
}: VInputProps<T>) => {
	const InputComponent = isPassword ? Input.Password : Input

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={{
				required: required,
				pattern:
					patternValue && patternMessage
						? {
								value: patternValue,
								message: patternMessage
							}
						: undefined,
				validate
			}}
			render={({ field }) => {
				return (
					<InputComponent
						status={validateStatus && 'error'}
						placeholder={placeholder}
						style={style}
						{...field}
					/>
				)
			}}
		/>
	)
}
