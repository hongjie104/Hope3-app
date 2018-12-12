
import { SERVER_HOST } from './config';
import { get, post } from './utils/net';

// export function fetchGoodsTypeArr() {
// 	get(`${SERVER_HOST}/api/goodsType`, data => {
// 		console.warn(data);
// 	});
// }

export function getHomeData(seriesCount, popularGoodsColorCount, recommendGoodsColorCount) {
	return get(`${SERVER_HOST}/api/app/home/${seriesCount}/${popularGoodsColorCount}/${recommendGoodsColorCount}`);
}

// export function getTopSeries(count) {
// 	return get(`${SERVER_HOST}/api/app/series/top/${count}`);
// }


// export function showGoodsType(id) {
// 	return get(`${SERVER_HOST}/api/app/goods/${id}`);
// }

// export function getTopGoodsColor(count) {
// 	return get(`${SERVER_HOST}/api/app/goodsColor/top/${count}`);
// }