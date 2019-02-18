'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Button from '../../components/Button';
import { toDips, getFontSize } from '../../utils/dimensions';
import * as service from '../../service';
import { saveLocalData } from '../../utils/storage';
import navigation from '../../utils/navigation';
import toast from '../../utils/toast';

export default class RegisterUserScene extends PureComponent {
	
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: 'User information',
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			avatarSource: null,
			username: '',
		};
	}

	takePhoto() {
		const options = {
			title: 'Select Avatar',
			// customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};
		ImagePicker.showImagePicker(options, (response) => {
			// console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				// const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					avatarSource: response.uri,
				});
			}
		});
	}

	async onSubmit() {
		const { email, password } = this.props.navigation.state.params;
		const { avatarSource, username } = this.state;
		try {
			const result = await service.register(username, email, password);
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

	render() {
		// const { navigate, goBack } = this.props.navigation;
		const { avatarSource, username } = this.state;
		return (
			<View style={styles.container}>
				{
					avatarSource ? (
						<Image style={styles.avatarContainer} source={{ uri: avatarSource }} />
					) : (
						<View style={styles.avatarContainer}>
							<Image style={styles.imgAvatarDefault} source={require('../../imgs/default_head.png')} />
						</View>
					)
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						this.takePhoto();
					}}
					style={styles.takePhotoBtn}
				>
					<Image style={styles.imgCamera} source={require('../../imgs/camera.png')} />
				</TouchableOpacity>

				<TextInput
					style={styles.input}
					onChangeText={ username => this.setState({ username }) }
					value={ username }
					keyboardType='default'
					maxLength={16}
					placeholder='Username'
					placeholderTextColor='#595555'
					returnKeyType='done'
					underlineColorAndroid='transparent'
				/>
				<View style={styles.line} />
				<Button
					buttonStyle={styles.submitBtn}
					onPress={async () => {
						await this.onSubmit();
					}}
					content='Save'
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
	avatarContainer: {
		width: toDips(194),
		height: toDips(194),
		backgroundColor: '#989898',
		borderRadius: toDips(97),
		alignSelf: 'center',
		marginTop: toDips(50),
		alignItems: 'center',
		justifyContent: 'center',
	},
	imgAvatarDefault: {
		width: toDips(72),
		height: toDips(80),
	},
	takePhotoBtn: {
		marginLeft: toDips(401),
		marginTop: toDips(-38),
	},
	imgCamera: {
		width: toDips(68),
		height: toDips(68),
	},
	input: {
		width: toDips(536),
		alignSelf: 'center',
		marginTop: toDips(82),
	},
	line: {
		width: toDips(568),
		height: toDips(6),
		backgroundColor: '#D0021B',
		alignSelf: 'center',
		marginTop: toDips(16),
	},
	submitBtn: {
		marginTop: toDips(96),
	},
});
