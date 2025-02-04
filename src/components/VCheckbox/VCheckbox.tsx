import { Checkbox } from 'antd'
import {
	Control,
	Controller,
	FieldValues,
	Path,
	PathValue
} from 'react-hook-form'

interface VCheckboxProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	defaultValue: PathValue<T, Path<T>>
	required: boolean | string
}

export const VCheckbox = <T extends FieldValues>({
	name,
	control,
	defaultValue,
	required
}: VCheckboxProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={{
				required: required
			}}
			render={({ field }) => (
				<Checkbox
					checked={field.value}
					onClick={() => field.onChange(!field.value)}
					{...field}
				/>
			)}
		/>
	)
}
