'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
} from 'react-native';

import { toDips, getFontSize } from '../utils/dimensions';

export default class Button extends PureComponent {
	
	constructor(props) {
		super(props);
	}

	render() {
		const { content, buttonStyle } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					this.props.onPress && this.props.onPress();
				}}
				style={[styles.container, buttonStyle || null]}
			>
				<Text style={styles.txt}>
					{ content || 'this.props.content' }
				</Text>	
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: toDips(488),
		height: toDips(78),
		backgroundColor: '#D0021B',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	txt: {
		fontSize: toDips(36),
		fontFamily: 'GillSans-SemiBold',
		// font-weight:600;
		color: 'white',
	},
});
