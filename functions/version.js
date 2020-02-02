exports.handler = async (event, context, callback) => {
	return callback (null, {
		statusCode: 200,
		body: '1.0.7'
	})
}