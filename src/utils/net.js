import { NetInfo } from 'react-native';

// import * as utils from './utils';

const TIME_OUT = 12000;

let isConnected = true;

function handleConnectivityChange(_isConnected) {
    isConnected = _isConnected;
}

NetInfo.isConnected.addEventListener('change', handleConnectivityChange);
NetInfo.isConnected.fetch().done((_isConnected) => { isConnected = _isConnected; });

function timeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject('网络似乎不通畅，请稍后再试'), ms);
        promise.then((response) => {
            clearTimeout(timer);
            resolve(response);
        }).catch(reject);
    });
}

/**
 * 发送post请求
 * @param  {[string]}   url             api
 * @param  {[json]}     data            数据
 */
export function post(url, data) {
    return new Promise((resolve, reject) => {
        if (!isConnected) {
            // utils.toast('网络链接已断开');
            reject('net is not Connected');
            return;
        }
        timeout(fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }), TIME_OUT)
            .then(response => response.text())
            .then((responseText) => {
                let jsonData = null;
                try {
                    jsonData = JSON.parse(responseText);
                } catch (e) {
                    reject('服务器出错了');
                    return;
                }
                if (jsonData.success) {
                    resolve(jsonData.data);
                } else {
                    reject(jsonData.data);
                }
            })
            .catch(e => reject(e));
    });
}

/**
 * 发送get请求
 * @param  {[string]}   url             api
 */
export function get(url) {
    return new Promise((resolve, reject) => {
        if (!isConnected) {
            // utils.toast('网络链接已断开');
            reject('net is not Connected');
            return;
        }
        timeout(fetch(url), TIME_OUT)
            .then(response => response.text())
            .then((responseText) => {
                // on success
                let jsonData = null;
                try {
                    jsonData = JSON.parse(responseText);
                } catch (e) {
                    reject('服务器出错了');
                    return;
                }
                if (jsonData.success) {
                    resolve(jsonData.data);
                } else {
                    reject(jsonData.data);
                }
            })
            .catch(e => {
                reject(e);
            });
    });
}
