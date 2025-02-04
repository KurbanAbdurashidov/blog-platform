import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

export const LoadingSpin: React.FC = () => {
	return (
		<Flex
			align='center'
			style={{
				minHeight: '60vh',
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<Spin
				style={{
					background: '#ebe7e7',
					borderRadius: '50%',
					width: '90px',
					height: '90px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
				indicator={
					<LoadingOutlined
						style={{
							fontSize: 70
						}}
						spin
					/>
				}
			/>
		</Flex>
	)
}
