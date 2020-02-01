exports.handler = async (event, context, callback) => {
	return callback (null, {
		statusCode: 200,
		body: {
			version: '1.0.0'
		}
	})
}