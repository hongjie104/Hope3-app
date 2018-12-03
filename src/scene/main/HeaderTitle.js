'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

import { toDips, getFontSize } from '../../utils/dimensions';

export default class HeaderTitle extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: toDips(710),
		height: toDips(56),
		backgroundColor: 'white',
	}
});
