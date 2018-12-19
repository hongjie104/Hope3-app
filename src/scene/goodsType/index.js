'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import GoodsColorScrollView from './GoodsColorScrollView';
import { getGoodsType, getGoodsColor } from '../../service';
import { toDips, getFontSize } from '../../utils/dimensions';
import toast from '../../utils/toast';
import { IMG_HOST } from '../../config';

export default class DetailScene extends PureComponent {
	
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: '鞋子详情',
	});

	constructor(props) {
		super(props);
		this.state = {
			goodsType: null,
			goodsColorArr: [],
			goodsArr: [],
			targetGoodsColorId: null,
		};
	}

	async componentDidMount() {
		const { goodsColorId, goodsTypeId } = this.props.navigation.state.params;
		let data = null;
		try {
			data = await getGoodsType(goodsTypeId, goodsColorId);
		} catch(e) {
			toast(e);
			return;
		}
		const {
			goodsType,
			goodsColorArr,
			goodsArr,
		} = data;

		
		this.setState({
			goodsType,
			goodsColorArr,
			goodsArr: this.overrideGoodsArr(goodsArr),
			targetGoodsColorId: goodsColorId,
		});
	}

	navigateToSizeSelector() {
		const { navigate } = this.props.navigation;
		navigate({
			routeName: 'shoesSizeSelector',
			params: { mode: 'modal' },
		});
	}

	overrideGoodsArr(goodsArr) {
		// const sizeSortFunc = (a, b) => a - b;
		const sizeMapFunc = s => s.size;
		const goodsMapFunc = g => {
			const sku = g.sku.filter(s => s.isInStock);
			return {
				img: g.img,
				size: sku.map(sizeMapFunc),
				lowerPrice: sku.sort((a, b) => a.price - b.price)[0].price,
				key: g._id,
			};
		};
		return goodsArr.map(goodsMapFunc);
	}

	async onFetchGoodsColor(goodsColorId) {
		let data = null;
		try {
			data = await getGoodsColor(goodsColorId);
		} catch (e) {
			toast(e);
			return;
		}
		this.setState({
			targetGoodsColorId: goodsColorId,
			goodsArr: this.overrideGoodsArr(data.goodsArr),
		});
	}

	renderHeader() {
		const { goodsColorArr, targetGoodsColorId } = this.state;
		let goodsColor = goodsColorArr[0];
		for (let i = 0; i < goodsColorArr.length; i++) {
			if (goodsColorArr[i]._id === targetGoodsColorId) {
				goodsColor = goodsColorArr[i];
				break;
			}
		}
		if (!goodsColor) { return null; }
		return (
			<View style={styles.container}>
				<Image style={styles.mainImg} source={{ uri: `${IMG_HOST}/${goodsColor.img}` }} />
				<Text style={styles.mainName}>
					{ goodsColor.name }
				</Text>
				<Text style={styles.mainColor}>
					{ goodsColor.color_name }
				</Text>
				{
					// 配色列表
				}
				<GoodsColorScrollView
					goodsColorArr={goodsColorArr}
					targetGoodsColorId={targetGoodsColorId}
					onGoodsColorChange={ async (goodsColorId) => {
						await this.onFetchGoodsColor(goodsColorId);
					}}
				/>
				{
					// 尺寸选择器
				}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						this.navigateToSizeSelector();
					}}
					style={styles.sizeSelector}
				>
					<Text style={styles.sizeSelectorTitle}>
						Select a size
					</Text>
					<View style={styles.sizeSelectorValueContainer}>
						<Text style={styles.sizeSelectorValue}>
							12.5
						</Text>
						<Image style={styles.imgArrowDown} source={require('../../imgs/arrow_down.png')} />
					</View>
				</TouchableOpacity>
				{
					// 商品列表
				}
				<Text style={styles.goodsTitle}>
					Available Stores
				</Text>
				<View style={styles.goodsLine} />
			</View>
		);
	}

	renderGoods({ item, index }) {
		return (
			<View style={styles.goodsContainer}>
				<View style={styles.goodsContainerLeft}>
					<Image style={styles.goodsImg} source={{ uri: `${IMG_HOST}/${item.img}` }} />
					<View style={styles.goodsInfoContainer}>
						<View style={styles.goodsPlatformContainer}>
							<Image style={styles.platformLogo} source={require('../../imgs/logo_finishline.png')} />
							<Text style={styles.platformTxt}>
								{ item.platform }
							</Text>
						</View>
						<Text style={styles.goodsSizeTxt} numberOfLines={1}>
							{ item.size.join(',') }
						</Text>
					</View>
				</View>
				<Text style={styles.goodsPrice}>
					$ { item.lowerPrice }
				</Text>
			</View>
		);
	}

	render() {
		const { goodsArr } = this.state;
		const goodsItemHeight = toDips(184);
		return (
			<FlatList
				data={goodsArr}
				// extraData={this.state}
				// keyExtractor={this._keyExtractor}
				renderItem={this.renderGoods}
				ItemSeparatorComponent={() => <View style={{ backgroundColor: '#C2C4CA', height: 1, }} />}
				// 列表为空时渲染该组件
				// ListEmptyComponent={() => {}}
				ListHeaderComponent={() => {
					return this.renderHeader();
				}}
				getItemLayout={(data, index) => (
					{ length: goodsItemHeight, offset: goodsItemHeight * index, index }
				)}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	mainImg: {
		width: toDips(390),
		height: toDips(390),
		alignSelf: 'center',
	},
	mainName: {
		fontSize: getFontSize(32),
		color: '#4A4A4A',
		fontWeight: 'bold',
		marginLeft: toDips(24),
		marginTop: toDips(24),
	},
	mainColor: {
		fontSize: getFontSize(24),
		color: '#4A4A4A',
		marginLeft: toDips(24),
		marginTop: toDips(8),
	},
	sizeSelector: {
		backgroundColor: 'rgba(215,216,218,0.28)',
		width: toDips(686),
		height: toDips(76),
		borderRadius: toDips(4),
		borderColor: '#F4F4F5',
		borderWidth: toDips(2),
		marginLeft: toDips(32),
		marginTop: toDips(32),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sizeSelectorTitle: {
		fontSize: getFontSize(28),
		color: '#908C91',
		marginLeft: toDips(16),
	},
	sizeSelectorValueContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	sizeSelectorValue: {
		fontSize: getFontSize(32),
		color: '#4A4A4A',
		fontWeight: 'bold',
	},
	imgArrowDown: {
		width: toDips(42),
		height: toDips(26),
		marginRight: toDips(16),
		marginLeft: toDips(32),
	},
	goodsTitle: {
		fontSize: getFontSize(24),
		color: '#161616',
		marginLeft: toDips(32),
		marginTop: toDips(32),
	},
	goodsLine: {
		backgroundColor: '#C2C4CA',
		width: toDips(750),
		height: toDips(2),
		marginTop: toDips(16),
	},
	goodsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: toDips(184),
		// borderBottomWidth: toDips(2),
		// borderColor: '#C2C4CA',
		backgroundColor: 'white',
	},
	goodsContainerLeft: {
		flexDirection: 'row',
	},
	goodsImg: {
		width: toDips(144),
		height: toDips(144),
		marginLeft: toDips(32),
	},
	goodsInfoContainer: {
		marginLeft: toDips(16),
	},
	goodsPlatformContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	platformLogo: {
		width: toDips(60),
		height: toDips(60),
	},
	platformTxt: {
		fontSize: getFontSize(28),
		color: '#4A4A4A',
		marginLeft: toDips(16),
	},
	goodsSizeTxt: {
		marginTop: toDips(20),
		fontSize: getFontSize(20),
		color: '#858186',
		maxWidth: toDips(320),
	},
	goodsPrice: {
		fontSize: getFontSize(28),
		color: '#D0021B',
		marginRight: toDips(32),
	},
});
