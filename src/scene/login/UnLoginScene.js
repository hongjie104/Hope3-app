'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

import Button from '../../components/Button';
import { toDips, getFontSize } from '../../utils/dimensions';

export default class UnLoginScene extends PureComponent {
	
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: '',
		headerStyle: {
			// // 导航栏颜色
			backgroundColor: '#EEF0F3',
			borderBottomWidth: 0,
		},
	});

	constructor(props) {
		super(props);
	}

	onReigster() {
		const { navigate } = this.props.navigation;
		navigate({
			routeName: 'RegisterScene',
		});
	}

	onLogin() {
		const { navigate } = this.props.navigation;
		navigate({
			routeName: 'LoginScene',
		});
	}

	render() {
		const { navigate, goBack } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					Welcome to Collectionzip
				</Text>
				<Text style={styles.des}>
					the best sneaker shopping assistant
				</Text>
				<View style={styles.container} />
				<Button
					buttonStyle={styles.reigsetBtn}
					content='Register'
					onPress={() => {
						this.onReigster();
					}}
				/>
				<Button
					buttonStyle={styles.loginBtn}
					content='Login'
					onPress={() => {
						this.onLogin();
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEF0F3',
	},
	title: {
		fontSize: toDips(48),
		fontFamily: 'Helvetica',
		color: '#050505',
		alignSelf: 'center',
		marginTop: toDips(126),
	},
	des: {
		fontSize: toDips(28),
		fontFamily: 'Helvetica-Light',
		// font-weight:300;
		color: '#050505',
		alignSelf: 'center',
		marginTop: toDips(28),
	},
	reigsetBtn: {
		marginBottom: toDips(48),
	},
	loginBtn: {
		marginBottom: toDips(154),	
	},
});
