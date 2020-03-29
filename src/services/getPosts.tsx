import api from './api';

export type Order = 'hot' | 'new' | 'top' | 'rising' | 'controversial';
export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export type Params = { 
	subreddits: string[], 
	order: Order, 
	time: Time,
	limit?: number,
}

const getPosts = async({ subreddits, order, time, limit }: Params, callback ?: Function): Promise<Object[]> => {
	const options = {
		limit: limit || 20,
		count: limit || 20,
		amount: limit || 20,
		skipReplies: true,
	}

	let subsString;
	if (subreddits.length === 0) subsString = 'all';
	if (subreddits.length !== 0) subsString = subreddits.reduce((prev, curr) => prev + '+' + curr);

	let subs = api.getSubreddit(subsString)
	let listingResult;
	switch(order) {
		case 'hot':
			listingResult = await subs.getHot({ ...options });
			break;
		case 'new':
			listingResult = await subs.getNew({ ...options });
			break;
		case 'top':
			listingResult = await subs.getTop({ ...options, time });
			break;
		case 'controversial':
			listingResult = await subs.getControversial({ ...options, time });
			break;
		default:
			listingResult = await subs.getHot({ ...options });
			break;
	}
	const extensions = ['jpg', 'jpeg', 'png', 'gif'];
	let filteredResults = await listingResult.filter(res => {
		let { url } = res;
		let postExtension = url.substr(url.lastIndexOf('.') + 1);
		return extensions.includes(postExtension);
	});
	if (callback) return callback(filteredResults);
	return filteredResults;
}

export default getPosts