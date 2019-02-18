'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

import LoginScene from './index';
import Button from '../../components/Button';
import { toDips, getFontSize } from '../../utils/dimensions';
import { isEmail } from '../../utils/reg';
import toast from '../../utils/toast';

export default class ReigsterScene extends LoginScene {
	
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'Create a account',
		}
	};

	constructor(props) {
		super(props);
	}

	onSubmit() {
		const { username, password } = this.state;
		if (!isEmail(username)) {
			toast('请输入正确的email地址');
			return;
		}
		if (password.length < 6) {
			toast('密码位数不能少于6位');
			return;
		}
		const { navigate } = this.props.navigation;
		navigate({
			routeName: 'RegisterUserScene',
			params: {
				email: username,
				password,
			},
		});
	}

	renderPrivacyPolicy() {
		return (
			<View style={styles.txtView}>
				<Text style={styles.txt}>
					By proceeding,you agree to 
				</Text>
				<Text style={ [styles.txt, styles.redTxt] }>
					Privacy Policy<Text style={styles.txt}> and </Text>
					<Text style={ [styles.txt, styles.redTxt] }>
						Term of Service
					</Text>
				</Text>
			</View>
		);
	}

	renderSubmitBtn() {
		return (
			<Button
				content='Start'
				buttonStyle={styles.btn}
				onPress={() => {
					this.onSubmit();
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	txtView: {
		width: toDips(568),
		alignSelf: 'center',
		marginTop: toDips(24),
	},
	txt: {
		fontSize: getFontSize(24),
		fontFamily: 'Helvetica',
		color: '#1C1B1B',
	},
	redTxt: {
		color: '#E20000',
	},
	btn: {
		marginTop: toDips(96),
	},
});
