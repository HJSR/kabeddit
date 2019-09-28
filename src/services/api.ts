import snoowrap from 'snoowrap';
require('dotenv').config()

const reddit = new snoowrap({
	userAgent: process.env.REACT_APP_USER_AGENT,
	clientId: process.env.REACT_APP_CLIENT_ID,
	clientSecret: process.env.REACT_APP_CLIENT_SECRET,
	refreshToken: process.env.REACT_APP_REFRESH_TOKEN,
});

export default reddit