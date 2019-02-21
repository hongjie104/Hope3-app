'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	TextInput,
} from 'react-native';

import Button from '../../components/Button';
import toast from '../../utils/toast';
import { toDips, getFontSize } from '../../utils/dimensions';
import { isEmail } from '../../utils/reg';
import * as service from '../../service';
import { saveLocalData } from '../../utils/storage';
import navigation from '../../utils/navigation';
import { THEME_COLOR } from '../../config';

export default class LoginScene extends PureComponent {
	
	static navigationOptions = ({ navigation }) => {
		return {
			// headerStyle: {
			// 	// backgroundColor: 'black',
			// },
			headerTitle: 'login',
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
	}

	async onSubmit() {
		const { username, password } = this.state;
		if (!isEmail(username)) {
			toast('请输入正确的email地址');
			return;
		}
		if (password.length < 6) {
			toast('密码位数不能少于6位');
			return;
		}
		try {
			const result = await service.login(username, password);
			const { token } = result;
			saveLocalData('token', token, () => {
				global.token = token;
				navigation.reset(this.props.navigation, 'main');
			});
		} catch (e) {
			console.warn(e);
			toast(e.msg);
		}
	}

	renderPrivacyPolicy() {
		return null;
	}

	renderSubmitBtn() {
		return (
			<Button
				content='Login'
				buttonStyle={styles.btn}
				onPress={async () => {
					await this.onSubmit();
				}}
			/>
		);
	}

	render() {
		// const { navigate, goBack } = this.props.navigation;
		const { username, password } = this.state;
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					onChangeText={ username => this.setState({ username }) }
					value={ username }
					keyboardType='email-address'
					maxLength={16}
					placeholder='email'
					placeholderTextColor='#595555'
					returnKeyType='next'
					textContentType='emailAddress'
					underlineColorAndroid='transparent'
				/>
				<View style={styles.line} />
				<TextInput
					style={ [styles.input, styles.passwordInput] }
					onChangeText={ password => this.setState({ password }) }
					value={ password }
					keyboardType='default'
					maxLength={16}
					placeholder='password'
					placeholderTextColor='#595555'
					returnKeyType='done'
					textContentType='password'
					underlineColorAndroid='transparent'
					secureTextEntry={true}
				/>
				<View style={styles.line} />
				{
					this.renderPrivacyPolicy()
				}
				{
					this.renderSubmitBtn()
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: THEME_COLOR,
	},
	input: {
		width: toDips(536),
		alignSelf: 'center',
		marginTop: toDips(194),
	},
	line: {
		width: toDips(568),
		height: toDips(6),
		backgroundColor: '#D0021B',
		alignSelf: 'center',
		marginTop: toDips(16),
	},
	passwordInput: {
		marginTop: toDips(112),
	},
	btn: {
		marginTop: toDips(96),
	},
});
