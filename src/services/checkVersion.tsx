import axios from 'axios';
import pjson from '../../package.json';
const { version } = pjson;

const checkVersion = async () => {
	const body = await axios.get('/.netlify/functions/version');
	console.log(body, version);
}
export default checkVersion;