exports.handler = async (event, context) => {
	return {
		statusCode: 200,
		body: {
			version: '1.0.0'
		}
	}
}