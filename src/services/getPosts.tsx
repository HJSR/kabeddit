import api from './api';

export type Order = 'hot' | 'new' | 'top' | 'rising' | 'controversial';
export type Time = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export type Params = { 
	subreddits: string[], 
	order: Order, 
	time: Time,
}

const getPosts = ({ subreddits, order, time }: Params, callback?: Function): Object[] => {

	let subsString;
	if (subreddits.length === 0) subsString = 'all';
	if (subreddits.length !== 0) subsString = subreddits.reduce((prev, curr) => prev + '+' + curr);

	let subs = api.getSubreddit(subsString)
	let listingResult;
	switch(order) {
		case 'hot':
			listingResult = subs.getHot();
			break;
		case 'new':
			listingResult = subs.getNew();
			break;
		case 'top':
			listingResult = subs.getTop({ time });
			break;
		case 'rising':
			listingResult = subs.getRising();
			break;
		case 'controversial':
			listingResult = subs.getControversial({ time });
			break;
		default:
			listingResult = subs.getHot();
			break;
	}
	if (callback) return callback(listingResult);
	return listingResult;
}

export default getPosts