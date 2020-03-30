import axios from 'axios';
import subredditsTree, { defaultSubreddits } from '../utils/subredditsTree';

const getSubreddits = async () => {
	try {
		const res = await axios.get('/.netlify/functions/subreddits');
		if (!res || !res.data || res.status !== 200) {
			throw new Error("No res, res.data, res.status not 200");
		};
		console.log(res);
		return JSON.parse(res.data);
	} catch (err) {
		return {
			subreddits: subredditsTree,
			defaultSelection: defaultSubreddits,
		};
	}
}
export default getSubreddits;