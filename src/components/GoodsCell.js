'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { toDips, getFontSize } from '../utils/dimensions';
import { IMG_HOST } from '../config';

export default class GoodsCell extends PureComponent {

	static propTypes = {
		onPress: PropTypes.func.isRequired,
		goods: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { goods } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => {
					this.props.onPress(goods);
				}}
				style={[styles.container, this.props.style || null]}
			>
				<View style={styles.imgAndNameContainer}>
					<Image style={styles.goodsImg} source={{ uri: `${IMG_HOST}/${goods.img}` }} />
					<View style={styles.goodsNameContainer}>
						<Text style={styles.goodsName} numberOfLines={2}>
							{ goods.name }
						</Text>
					</View>
				</View>
				<View style={styles.goodsInfo}>
					<Text style={styles.goodsPrice}>
						from <Text style={styles.goodsBigPrice}>${ goods.price }</Text>
					</Text>
					<Text style={styles.goodsNumShop}>
						{ goods.numShop } shops
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	imgAndNameContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	goodsImg: {
		width: toDips(120),
		height: toDips(120),
		marginTop: toDips(32),
		// borderColor: 'red',
		// borderWidth: 1,
	},
	goodsNameContainer: {
		marginTop: toDips(32),
		// height: toDips(99),
		width: toDips(308),
		flex: 1,
		// justifyContent: 'center',
		// borderColor: 'red',
		// borderWidth: 1,
	},
	goodsName: {
		// fontFamily: 'GillSans',
		fontFamily: 'ArialMTStd-LightCond',
		fontSize: getFontSize(26),
		// color: '#514E4E',
		color: 'black',
		maxWidth: toDips(308),
	},
	goodsInfo: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		marginTop: toDips(16),
		marginBottom: toDips(16),
		width: toDips(308),
		// borderColor: 'red',
		// borderWidth: 1,
	},
	goodsPrice: {
		// fontFamily: 'GillSans-SemiBold',
		fontFamily: 'ArialMTStd-BoldCond',
		// color: '#514E4E',
		color: 'black',
		fontSize: getFontSize(24),
	},
	goodsBigPrice: {
		fontSize: getFontSize(32),
	},
	goodsNumShop: {
		// fontFamily: 'GillSans',
		fontFamily: 'ArialMTStd-LightCond',
		color: '#181818',
		fontSize: getFontSize(24),
	},
});
