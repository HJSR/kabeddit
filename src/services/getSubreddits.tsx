import axios from 'axios';
import subredditsTree, { defaultSubreddits } from '../utils/subredditsTree';

const getSubreddits = async () => {
	const res = await axios.get('/.netlify/functions/subreddits');
	if (!res || !res.data || res.status !== 200) {
		return {
			subreddits: subredditsTree,
			defaultSelection: defaultSubreddits,
		};
	};
	const data = JSON.parse(res.data);
	return data;
}
export default getSubreddits;