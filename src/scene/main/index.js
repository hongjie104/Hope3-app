'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
} from 'react-native';

import Swiper from 'react-native-swiper';
import HeaderTitle from './HeaderTitle';
import TopStyle from './TopStyle';
import PopularGoodsColor from './PopularGoodsColor';
import { toDips, getFontSize } from '../../utils/dimensions';
import toast from '../../utils/toast';
import { getHomeData, getRecommendGoodsColor } from '../../service';
import { IMG_HOST } from '../../config';

let self = null;

export default class MainScene extends PureComponent {
	
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				backgroundColor: 'black',
			},
			headerTitle: <HeaderTitle onHeaderPress={(val) => { self.onHeaderPress(val); }} />,
			// tabBarIcon: ({ focused, tintColor }) => {
			// 	const img = focused ? require('../../imgs/syax.png') : require('../../imgs/sy.png');
			// 	return <Image style={{ width: toDips(50), height: toDips(50), }} source={img} />;
			// },
			tabBarLabel: ({ focused }) => {
				return <Text style={[{ fontSize: getFontSize(26), alignSelf: 'center', }, focused ? { color: '#DD4124' } : { color: '#878787' }]}>HOME</Text>;
			},
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			topSeriesArr: [],
			topGoodsColor: [],
			recommendGoodsColorArr: [],
			refreshing: false,
			// featuredShoesArr: [
			// 	{
			// 		img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
			// 		name: 'Air Jordan',
			// 		price: '890',
			// 		numShop: 20,
			// 		id: 1,
			// 		key: '1',
			// 	},
			// ],
		};
	}

	async componentDidMount() {
		// this.props.navigation.setParams({
		// 	a: this.onHeaderPress.bind(this),
		// 	b: '10',
		// });
		self = this;
		this.recommendGoodsColorPageSize = 16;
		this.recommendGoodsColorPage = 1
		let data = null;
		try {			
			data = await getHomeData(7, 16, this.recommendGoodsColorPageSize);
		} catch (e) {
			toast(e);
			return;
		}
		const {
			popularGoodsColorArr,
			recommendGoodsColorArr,
			topSeries,
		} = data;
		const newRecommendGoodsColorArr = [];
		let index = 0;
		// 分成二维数组，每个元素都是长度为2的数组
		while (recommendGoodsColorArr.length > 0) {
			newRecommendGoodsColorArr.push({
				key: `featuredShoes${index++}`,
				arr: recommendGoodsColorArr.splice(0, 2),
			});
		}
		this.setState({
			topSeriesArr: topSeries,
			topGoodsColor: popularGoodsColorArr,
			recommendGoodsColorArr: newRecommendGoodsColorArr,
		});
	}

	async fetchRecommendGoodsColor() {
		let result = null;
		try {
			result = await getRecommendGoodsColor(this.recommendGoodsColorPage + 1, this.recommendGoodsColorPageSize);
		} catch (e) {
			toast(e);
		}
		if (result && result.goodsColorArr && result.goodsColorArr.length > 0) {
			this.recommendGoodsColorPage += 1;
			const newRecommendGoodsColorArr = [];
			let index = this.state.recommendGoodsColorArr.length;
			// 分成二维数组，每个元素都是长度为2的数组
			while (result.goodsColorArr.length > 0) {
				newRecommendGoodsColorArr.push({
					key: `featuredShoes${index++}`,
					arr: result.goodsColorArr.splice(0, 2),
				});
			}
			this.setState({
				recommendGoodsColorArr: [...this.state.recommendGoodsColorArr, ...newRecommendGoodsColorArr],
				refreshing: false,
			});
		} else {
			this.setState({
				refreshing: false,
			});
		}
	}

	onHeaderPress(val) {
		
	}

	async onLoadMore() {
		await this.fetchRecommendGoodsColor();
	}

	async onRefresh() {
		this.recommendGoodsColorPage = 0;
		this.setState({
			refreshing: true,
			recommendGoodsColorArr: [],
		});
		await this.fetchRecommendGoodsColor();
	}

	onGoodsColorPressed(goodsColorId, goodsTypeId) {
		const { navigate } = this.props.navigation;
		navigate({
			routeName: 'GoodsTypeScene',
			params: {
				// mode: 'modal',
				goodsTypeId,
				goodsColorId,
			},
		});
	}

	renderHeader() {		
		const { topSeriesArr, topGoodsColor } = this.state;
		return (
			<View style={styles.container}>
				{
					// 轮播图
				}
				<View style={styles.swiperContainer}>
					<Swiper
					 	height={toDips(248)}
						width={toDips(750)}
						dotStyle={styles.swiperDot}
						activeDotStyle={styles.swiperDot}
					 	autoplay
					 >
					 	<TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
							<Image style={styles.swiperImg} source={require('../../imgs/banner_1.jpg')}/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
							<Image style={styles.swiperImg} source={require('../../imgs/banner_2.jpg')}/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
							<Image style={styles.swiperImg} source={require('../../imgs/banner_3.jpg')}/>
						</TouchableOpacity>
					</Swiper>
				</View>
				{
					// top styles
				}
				<TopStyle topSeriesArr={topSeriesArr} />
				{
					// Most Popular
				}
				<PopularGoodsColor
					topGoodsColor={topGoodsColor}
					onGoodsColorPressed={(goodsColorId, goodsTypeId) => {
						this.onGoodsColorPressed(goodsColorId, goodsTypeId);
					}}
				/>
				{
					// Featured
				}
				<View style={styles.recommendationContainer}>
					<Text style={styles.headerTxt}>
						Recommendations
					</Text>
				</View>
			</View>
		);
	}

	renderGoods(item, isLeft = false) {
		if (item) {
			return (
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						this.onGoodsColorPressed(item._id, item.goods_type_id);
					}}
					style={[styles.featuredShoesCell, isLeft ? styles.featuredShoesCellLeft : null]}
				>
					<Image style={styles.featuredShoesImg} source={{ uri: `${IMG_HOST}/${item.img}` }} />
					<View style={styles.featuredShoesNameContainer}>
						<Text style={styles.featuredShoesName} numberOfLines={2}>
							{ item.name }
						</Text>
					</View>
					<View style={styles.featuredShoesInfo}>
						<Text style={styles.featuredShoesPrice}>
							from $<Text style={styles.featuredShoesBigPrice}>{ item.price }</Text>
						</Text>
						<Text style={styles.featuredShoesNumShop}>
							{ item.numShop } shops
						</Text>
					</View>
				</TouchableOpacity>
			);
		}
	}

	renderGoodsRow({ item: { arr }, index }) {
		return (
			<View style={styles.featuredShoesCellRow}>
				{
					this.renderGoods(arr[0], true)
				}
				{
					this.renderGoods(arr[1])
				}
			</View>
		);
	}

	render() {
		const { recommendGoodsColorArr, refreshing } = this.state;
		// const goodsItemHeight = toDips(473);
		return (
			<FlatList
				data={recommendGoodsColorArr}
				// extraData={this.state}
				// keyExtractor={this._keyExtractor}
				renderItem={itemData => this.renderGoodsRow(itemData)}
				ItemSeparatorComponent={() => <View style={{ backgroundColor: '#C2C4CA', height: 1, }} />}
				// 列表为空时渲染该组件
				// ListEmptyComponent={() => {}}
				ListHeaderComponent={() => this.renderHeader()}
				// getItemLayout={(data, index) => (
				// 	{ length: goodsItemHeight, offset: goodsItemHeight * index, index }
				// )}
				onEndReached={async info => {
					await this.onLoadMore(info);
				}}
				onEndReachedThreshold={0.3}
				onRefresh={async () => {
					await this.onRefresh();
				}}
				refreshing={refreshing}				
			/>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EFEFEF',
	},
	swiperContainer: {
		height: toDips(248),
	},
	swiperImg: {
		width: toDips(750),
		height: toDips(248),
	},
	swiperDot: {
		marginBottom: -30,
	},
	recommendationContainer: {
		marginTop: toDips(16),
		backgroundColor: 'white',
	},
	headerTxt: {
		fontSize: getFontSize(34),
		marginLeft: toDips(32),
		marginTop: toDips(16),
		marginBottom: toDips(16),
	},
	featuredShoesCellRow: {
		width: toDips(750),
		// height: toDips(473),
		flexDirection: 'row',
		backgroundColor: 'white',
	},
	featuredShoesCell: {
		flex: 1,
		alignItems: 'center',
	},
	featuredShoesCellLeft: {
		borderRightWidth: 1,
		borderColor: '#E1E2E5',
	},
	featuredShoesImg: {
		width: toDips(120),
		height: toDips(120),
		marginTop: toDips(32),
	},
	featuredShoesNameContainer: {
		marginTop: toDips(16),
		height: toDips(99),
		justifyContent: 'center',
	},
	featuredShoesName: {
		fontSize: getFontSize(32),
		color: '#514E4E',
		maxWidth: toDips(308),
	},
	featuredShoesInfo: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		marginTop: toDips(16),
		marginBottom: toDips(32),
		width: toDips(308),
	},
	featuredShoesPrice: {
		color: '#514E4E',
		fontSize: getFontSize(24),
	},
	featuredShoesBigPrice: {
		fontSize: getFontSize(32),
	},
	featuredShoesNumShop: {
		color: '#181818',
		fontSize: getFontSize(28),
	},
});