'use strict';

import React, { PureComponent } from 'react';
import {
	BackHandler,
	View,
} from 'react-native';

import createAppNavigation from './navigation';
import { NavigationActions } from 'react-navigation';
import toast from './utils/toast';
import * as deviceInfo from './utils/deviceInfo';
// import logArr from './store/logArr';
import { loadLocalData } from './utils/storage';

let AppNavigation = null;

export default class App extends PureComponent {
	
	constructor(props) {
		super(props);

		this.state = {
			checkingLocalData: true,
		};

		// 上一次按下android返回键的时间
		this._lastPressBackTime = 0;

		// jpush.setReceiveCustomMsgCallback(message => {
		// 	logArr.push({
		// 		level: global.INFO,
		// 		log: `jpush message => ${JSON.stringify(message)}`
		// 	});
		// });

		// jpush.setReceiveNotificationCallback(message => {
		// 	logArr.push({
		// 		level: global.INFO,
		// 		log: `jpush notification => ${JSON.stringify(message)}`
		// 	});
		// });

		// logArr.push({
		// 	level: global.INFO,
		// 	log: 'just a test!!'
		// });
	}

	componentDidMount() {
		this.checkLogin();
	}

	checkLogin() {
		loadLocalData('token', token => {
			global.token = token;
			this.init(token);
		}, () => {
			this.init();
		});
	}

	init(token) {
		AppNavigation = createAppNavigation(token);
		if (!deviceInfo.isIOS()) {
			const defaultStateAction = AppNavigation.router.getStateForAction;
			AppNavigation.router.getStateForAction = (action, state) => {
				if(state && action.type === NavigationActions.BACK && state.routes.length === 1) {
					if (this._lastPressBackTime + 2000 < Date.now()) {
						toast('再按一次退出', 'bottom');
						this._lastPressBackTime = Date.now();
						const routes = [...state.routes];
						return {
							...state,
							...state.routes,
							index: routes.length - 1
						};
					}
				} 
				return defaultStateAction(action, state);
			};
		}
		this.setState({
			checkingLocalData: false,
		});
	}

	render() {
		if (this.state.checkingLocalData){
			return <View style={{ flex: 1 }}></View>
		}
		return (
			<AppNavigation ref={c => this._navigation = c} />
		);
	}
}
