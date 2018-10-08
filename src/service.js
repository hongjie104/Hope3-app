
import { SERVER_HOST } from './config';
import { get, post } from './utils/net';

export function fetchGoodsTypeArr() {
	get(`${SERVER_HOST}/api/goodsType`, data => {
		console.warn(data);
	});
}