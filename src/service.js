
import { SERVER_HOST } from './config';
import { get, post } from './utils/net';

// export function fetchGoodsTypeArr() {
// 	get(`${SERVER_HOST}/api/goodsType`, data => {
// 		console.warn(data);
// 	});
// }

export function register(name, email, password) {
	return post(`${SERVER_HOST}/api/app/user/register`, { name, email, password });
}

export function login(email, password) {
	return post(`${SERVER_HOST}/api/app/user/login`, { email, password });
}

export function getHomeData(seriesCount, popularGoodsColorCount, recommendGoodsColorCount) {
	return get(`${SERVER_HOST}/api/app/home/${seriesCount}/${popularGoodsColorCount}/${recommendGoodsColorCount}`);
}

export function getRecommendGoodsColor(page, pageSize) {
	return get(`${SERVER_HOST}/api/app/goodsColor/recommend/${page}/${pageSize}`);
}

export function getGoodsType(goodsTypeId, goodsColorId) {
	return get(`${SERVER_HOST}/api/app/goodsType/${goodsTypeId}?goodsColorId=${goodsColorId}`);
}

export function getGoodsColor(goodsColorId) {
	return get(`${SERVER_HOST}/api/app/goodsColor/${goodsColorId}`);
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