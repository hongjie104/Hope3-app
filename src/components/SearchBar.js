'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { toDips, getFontSize } from '../utils/dimensions';

export default class SearchBar extends PureComponent {

	static propTypes = {
		onPress: PropTypes.func.isRequired,
		title: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { onPress, title } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => {
					onPress();
				}}
				style={[styles.container, this.props.style || null]}
			>
				<Image style={styles.imgSearch} source={require('../imgs/search.png')} />
				<Text style={styles.txt}>
					{ title }
				</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: toDips(710),
		height: toDips(56),
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
	},
	imgSearch: {
		width: toDips(36),
		height: toDips(40),
		marginLeft: toDips(16),
	},
	txt: {
		fontSize: getFontSize(28),
		// fontFamily: 'GillSans',
		fontFamily: 'ArialMTStd-LightCond',
		color: '#ccc',
		marginLeft: toDips(16),
	},
});
