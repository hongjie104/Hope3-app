'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
} from 'react-native';

import { IMG_HOST } from '../../config';
import { toDips, getFontSize } from '../../utils/dimensions';

export default class PopularGoodsColor extends PureComponent {

	constructor(props) {
		super(props);
		const { topGoodsColor } = this.props;
		// 变成2维数组
		const half = Math.ceil(topGoodsColor.length / 2);
		const newArr = [];
		newArr[0] = topGoodsColor.slice(0, half);
		newArr[1] = topGoodsColor.slice(half + 1);
		this.state = {
			topGoodsColor: newArr,
		};
	}

	renderGoodsColorRow(goodsColorArr) {
		if (goodsColorArr) {
			return (
				<View style={styles.topGoodsColorRow}>
					{
						
						goodsColorArr.map((goodsColor, i) => (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {}}
								style={styles.topGoodsColorCell}
								key={`item0${i}`}
							>
								<Image style={styles.topGoodsColorImg} source={{ uri: `${IMG_HOST}/${goodsColor.img}` }} />
								<Text style={styles.topGoodsColorName} numberOfLines={2}>
									{ goodsColor.name }
								</Text>
								<Text style={styles.topGoodsColorPrice}>
									${ goodsColor.price }
								</Text>
							</TouchableOpacity>
						))
					}
				</View>
			);
		}
	}

	renderGoodsColorRows(goodsColorArr) {
		const { topGoodsColor } = this.state;
		return (
			<View style={styles.goodsColorRowContainer}>
				{
					this.renderGoodsColorRow(topGoodsColor[0])
				}
				{
					this.renderGoodsColorRow(topGoodsColor[1])
				}
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.headerTxt}>
					Most Popular
				</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					{
						this.renderGoodsColorRows()
					}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: toDips(16),
		backgroundColor: 'white',
	},
	headerTxt: {
		fontSize: getFontSize(34),
		marginLeft: toDips(32),
		marginTop: toDips(16),
	},
	goodsColorRowContainer: {
		flex: 1,
	},
	topGoodsColorRow: {
		flexDirection: 'row',
		paddingLeft: toDips(16),
		paddingRight: toDips(16),
	},
	topGoodsColorCell: {
		width: toDips(206),
		marginLeft: toDips(16),
		marginRight: toDips(16),
	},
	topGoodsColorImg: {
		width: toDips(206),
		height: toDips(206),
	},
	topGoodsColorName: {
		color: 'black',
		fontSize: getFontSize(24),
		marginTop: toDips(16),
		alignSelf: 'center',
	},
	topGoodsColorPrice: {
		fontSize: getFontSize(36),
		color: 'black',
		marginTop: toDips(16),
		alignSelf: 'center',
	},
});
