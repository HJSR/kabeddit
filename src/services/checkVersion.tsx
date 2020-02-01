import axios from 'axios';
import pjson from '../../package.json';
const { version } = pjson;

const checkVersion = async () => {
	const serverVersion = await axios.get('/.netlify/functions/version');
	console.log(serverVersion, version);
}
export default checkVersion;