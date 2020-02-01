import React from 'react';
import axios from 'axios';
import pjson from '../../package.json';
import { notification, Button } from 'antd';
const { version } = pjson;

const checkVersion = async () => {
	const res = await axios.get('/.netlify/functions/version');
	if (!res || !res.data || res.status !== 200) return null;
	const serverVersion = res.data;
	if (version !== serverVersion) {
		notification.info({
			message: 'New version available',
			description: (
				<Button 
					type="link"
					onClick={() => { window.location.reload() }}
					style={{ paddingLeft: 0 }}
				>
					Click here to restart
				</Button>
			),
			duration: null,
		})
	}
}
export default checkVersion;