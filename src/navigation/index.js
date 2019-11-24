'use strict';

import { Platform, YellowBox } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import TestScene1 from '../scene/test/TestScene1';
import TestScene2 from '../scene/test/TestScene2';
import TestScene3 from '../scene/test/TestScene3';

import UnLoginScene from '../scene/login/UnLoginScene'
import LoginScene from '../scene/login';
import RegisterScene from '../scene/login/RegisterScene';
import RegisterUserScene from '../scene/login/RegisterUserScene';
import LogScene from '../scene/log';
import MainScene from '../scene/main';
import GoodsTypeScene from '../scene/goodsType';
import ShoesSizeSelector from '../scene/goodsType/SizeSelector';
import SeriesSearch from '../scene/goodsSeries/SeriesSearch';
import SeriesShoes from '../scene/goodsSeries/SeriesShoes';

import { getFontSize } from '../utils/dimensions';
import { THEME_COLOR } from '../config';

import StackViewStyleInterpolator from "react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator";

YellowBox.ignoreWarnings([
	'Module CDVFileTransfer',
	'Module ZipPlugin',
	'Class CDVPlugin',
	'RCTBridge required'
]);

const TabNavigation = createBottomTabNavigator({
	HomeTab: { screen: MainScene },
	CheckinTab: { screen: LogScene },
});

TabNavigation.navigationOptions = ({ navigation }) => {
	const component = TabNavigation.router.getComponentForState(navigation.state);
	let options = null;
	if (typeof component.navigationOptions === 'function') {
		options = component.navigationOptions({ navigation });
	} else {
		options = component.navigationOptions;
	}
	return options || {};
};

// export default StackNavigator;
export default function createAppNavigation(isLogedIn) {
	return createStackNavigator({
		main: TabNavigation,
		UnLoginScene,
		LoginScene,
		RegisterScene,
		RegisterUserScene,
		GoodsTypeScene,
		SeriesSearch,
		SeriesShoes,
		shoesSizeSelector: ShoesSizeSelector,
		test1: TestScene1,
		test2: TestScene2,
		test3: TestScene3,
		logScene: LogScene,
	}, {
		initialRouteName: isLogedIn ? 'main' : 'UnLoginScene',
		// initialRouteName: 'RegisterUserScene',
		// mode: 'card',
		// headerMode: 'none',
		// headerTintColor: '#DD4124',
		navigationOptions: {
			gesturesEnabled: true,
			headerStyle: {
				// backgroundColor: '#DD4124',
				// 导航栏颜色
				backgroundColor: THEME_COLOR,
				shadowOpacity: 0,
				elevation: 0,
				borderBottomWidth: 0,
				borderColor: '#C3C5CB',
				borderBottomWidth: 1,
			},
			headerTitleStyle: {
				fontSize: getFontSize(28),
				color: 'black',
				...Platform.select({
					ios: null,
					android: {
						textAlign: 'center',
						alignSelf: 'center',
						flex: 1,
					},
				}),
			},
			headerTitleContainerStyle: Platform.select({
				ios: null,
				android: {
					left: 56,
					right: 56,
				},
			}),
			// 返回按钮的颜色
			headerTintColor: 'black',
		},
		transitionConfig: (transitionProps, prevTransitionProps, isModal) => {
			const { scenes } = transitionProps;
			const { params } = scenes[scenes.length - 1].route;
			if (params && params.mode === 'modal') {
				return {
					screenInterpolator: Platform.select({
						ios: StackViewStyleInterpolator.forVertical,
						android: StackViewStyleInterpolator.forFadeFromBottomAndroid,
					}),
				};
			}
			return {
				screenInterpolator: StackViewStyleInterpolator.forHorizontal,
			};
		},
	});
};
