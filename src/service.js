
import { SERVER_HOST } from './config';
import { get, post } from './utils/net';

export function fetchShoesArr() {
	get(`${SERVER_HOST}/api/shoes`, data => {
		console.warn(data);
	});
}