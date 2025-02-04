export const ErrorText: React.FC<{ message?: string }> = ({ message }) => {
	return (
		<p style={{ marginBottom: 5, color: 'tomato', fontSize: 12 }}>
			{message}
		</p>
	)
}
