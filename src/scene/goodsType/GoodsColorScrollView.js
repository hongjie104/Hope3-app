'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
import { toDips, getFontSize } from '../../utils/dimensions';
import { IMG_HOST } from '../../config';

export default class GoodsColorScrollView extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			targetGoodsColorId: props.targetGoodsColorId,
			goodsColorArr: props.goodsColorArr,
		};
	}

	render() {
		const { targetGoodsColorId, goodsColorArr } = this.state;
		const { onGoodsColorChange } = this.props;		
		return (
			<ScrollView
				style={styles.goodsColorScrollView}
				horizontal
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				onScroll={e => {
					console.warn(e.nativeEvent.contentOffset.x);
				}}
			>
				{
					goodsColorArr.map((item, index) => {
						return (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {
									onGoodsColorChange && onGoodsColorChange(item._id);
								}}
								style={styles.goodsColorContainer}
								key={`item${index}`}
							>
								<Image style={styles.goodsColorImg} source={{ uri: `${IMG_HOST}/${item.img}` }} />
								<View style={[styles.goodsColorNameContainer, item._id === targetGoodsColorId ? styles.goodsColorNameContainerSelected : null]}>
									<Text style={[styles.goodsColorName, styles.goodsColorNameSelected]}>
										{ item.color_name }
									</Text>
								</View>
							</TouchableOpacity>
						);
					})
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({	
	goodsColorScrollView: {
		width: toDips(750),
		height: toDips(210),
		marginTop: toDips(16),
	},
	goodsColorContainer: {
		width: toDips(166),
		height: toDips(210),
		borderColor: '#E1E0E0',
		borderWidth: toDips(2),
		marginLeft: toDips(8),
		marginRight: toDips(8),
		alignItems: 'center',
	},
	goodsColorImg: {
		width: toDips(120),
		height: toDips(120),
		marginTop: toDips(16),
	},
	goodsColorNameContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		width: toDips(166),
	},
	goodsColorNameContainerSelected: {
		backgroundColor: '#D0021B',
	},
	goodsColorName: {
		fontSize: getFontSize(24),
		color: '#4A4A4A',
	},
	goodsColorNameSelected: {
		color: 'white',
	},
});
