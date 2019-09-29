import api from './api';

export type Order = 'hot' | 'new' | 'top' | 'rising' | 'controversial';
export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export type Params = { 
	subreddits: string[], 
	order: Order, 
	time: Time,
	limit?: number,
}

const getPosts = ({ subreddits, order, time, limit }: Params, callback?: Function): Object[] => {
	const options = {
		limit: limit || 50,
		count: limit || 50,
		amount: limit || 50,
		skipReplies: true,
	}

	let subsString;
	if (subreddits.length === 0) subsString = 'all';
	if (subreddits.length !== 0) subsString = subreddits.reduce((prev, curr) => prev + '+' + curr);

	let subs = api.getSubreddit(subsString)
	let listingResult;
	switch(order) {
		case 'hot':
			listingResult = subs.getHot({ ...options });
			break;
		case 'new':
			listingResult = subs.getNew({ ...options });
			break;
		case 'top':
			listingResult = subs.getTop({ ...options, time });
			break;
		// case 'rising':
		// 	listingResult = subs.getRising({ ...options });
		// 	break;
		case 'controversial':
			listingResult = subs.getControversial({ ...options, time });
			break;
		default:
			listingResult = subs.getHot({ ...options });
			break;
	}
	if (callback) return callback(listingResult);
	return listingResult;
}

export default getPosts