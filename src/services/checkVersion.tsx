import React from 'react';
import axios from 'axios';
import pjson from '../../package.json';
import { notification, Button } from 'antd';
const { version } = pjson;

const checkVersion = async () => {
	// Checks version on the function (hardcoded)
	const res = await axios.get('/.netlify/functions/version');
	if (!res || !res.data || res.status !== 200) return null;
	const serverVersion = res.data;
	// compares it with the package.json version
	if (version !== serverVersion) {
		notification.info({
			message: 'New version available',
			description: (
				<Button 
					type="link"
					onClick={() => {
						const locationReload = window.location.href;
						window.location.href = locationReload;
					}}
					style={{ paddingLeft: 0 }}
				>
					Click here to restart. Actually this doesn't work. I don't know how to force getting a new version on Chrome/Safari/Firefox.
				</Button>
			),
			duration: null,
		})
	}
}
export default checkVersion;