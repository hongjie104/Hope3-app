'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
} from 'react-native';

export default class DetailScene extends PureComponent {
	
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `鞋子详情`,
	});

	constructor(props) {
		super(props);
	}

	render() {
		const { navigate, goBack } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text style={{}}>
					shoese detail
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
