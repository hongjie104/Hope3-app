'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { showGoodsType } from '../../service';
import { toDips, getFontSize } from '../../utils/dimensions';
import toast from '../../utils/toast';

export default class DetailScene extends PureComponent {
	
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: '鞋子详情',
	});

	constructor(props) {
		super(props);
		this.state = {
			goods: null,
			goodsArr: [
				{
					img: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg',
					size: '40,41,42,43,44',
					platform: 'Finishline',
					key: '1',
				},
				{
					img: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg',
					size: '40,41,42,43,44',
					platform: 'Finishline',
					key: '2',
				},
				{
					img: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg',
					size: '40,41,42,43,44',
					platform: 'Finishline',
					key: '3',
				},
				{
					img: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg',
					size: '40,41,42,43,44',
					platform: 'Finishline',
					key: '4',
				},
				{
					img: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg',
					size: '40,41,42,43,44',
					platform: 'Finishline',
					key: '5',
				},
				{
					img: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg',
					size: '40,41,42,43,44',
					platform: 'Finishline',
					key: '6',
				},
			],
		};
	}

	async componentDidMount() {
		const { goodsTypeId } = this.props.navigation.state.params;
		let data = null;
		try {
			data = await showGoodsType(goodsTypeId);
		} catch(e) {
			toast(e);
			return;
		}
		console.warn(data);
		this.setState({
			goods: data,
		});
	}

	navigateToSizeSelector() {
		const { navigate } = this.props.navigation;
		navigate({
			routeName: 'shoesSizeSelector',
			params: { mode: 'modal' },
		});
	}

	renderHeader() {
		return (
			<View style={styles.container}>
				<Image style={styles.mainImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg' }} />
				<Text style={styles.mainName}>
					鞋子名称
				</Text>
				<Text style={styles.mainColor}>
					鞋子颜色
				</Text>
				{
					// 配色列表
				}
				<View style={styles.goodsColorScrollContainer}>
					<ScrollView style={styles.goodsColorScrollView} horizontal showsHorizontalScrollIndicator={false}>
						{
							[1,2,3,4,5,6,7,8,9,0].map((item, index) => {
								return (
									<View style={styles.goodsColorContainer} key={`item${index}`}>
										<Image style={styles.goodsColorImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg' }} />
										<View style={[styles.goodsColorNameContainer, styles.goodsColorNameContainerSelected]}>
											<Text style={[styles.goodsColorName, styles.goodsColorNameSelected]}>
												款型名称
											</Text>
										</View>
									</View>
								);
							})
						}
					</ScrollView>
				</View>
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
					<Image style={styles.goodsImg} source={{ uri: item.img }} />
					<View style={styles.goodsInfoContainer}>
						<View style={styles.goodsPlatformContainer}>
							<Image style={styles.platformLogo} source={require('../../imgs/logo_finishline.png')} />
							<Text style={styles.platformTxt}>
								{ item.platform }
							</Text>
						</View>
						<Text style={styles.goodsSizeTxt}>
							{ item.size }
						</Text>
					</View>
				</View>
				<Text style={styles.goodsPrice}>
					$ 69.99
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
	goodsColorScrollContainer: {
		height: toDips(210),
		marginTop: toDips(16),
	},
	goodsColorScrollView: {
		width: toDips(750),
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
	},
	goodsPrice: {
		fontSize: getFontSize(28),
		color: '#D0021B',
		marginRight: toDips(32),
	},
});
