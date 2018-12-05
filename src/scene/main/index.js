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
import { toDips, getFontSize } from '../../utils/dimensions';
import toast from '../../utils/toast';
import { getTopSeries, getTopGoodsColor } from '../../service';
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
			featuredShoesArr: [
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 1,
					key: '1',
				},
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 2,
					key: '2',
				},
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 3,
					key: '3',
				},
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 4,
					key: '4',
				},
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 5,
					key: '5',
				},
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 6,
					key: '6',
				},
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 7,
					key: '7',
				},
				{
					img: 'http://hope3.pksen.com/flightclub/378037%20623.jpg?imageView2/2/h/600',
					name: 'Air Jordan',
					price: '890',
					numShops: 20,
					id: 8,
					key: '8',
				},
			],
		};
	}

	async componentDidMount() {
		// this.props.navigation.setParams({
		// 	a: this.onHeaderPress.bind(this),
		// 	b: '10',
		// });
		self = this;

		// 获取置顶的系列
		let topSeriesArr = null;
		try {
			topSeriesArr = await getTopSeries(7);
		} catch(e) {
			toast(e);
			return;
		}
		let topGoodsColorData = null;
		try {
			topGoodsColorData = await getTopGoodsColor(16);
		} catch(e) {
			toast(e);
			return;
		}
		this.setState({
			topSeriesArr,
			topGoodsColor: topGoodsColorData.goodsColorArr,
		});
	}

	onHeaderPress(val) {
		console.warn(val);
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
				<Text style={styles.headerTxt}>
					Top Styles
				</Text>
				<View style={styles.topShoesContainer}>
					{
						topSeriesArr.map((goods, i) => (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {}}
								style={styles.topShoesCell}
								key={`item${i}`}
							>
								<Image style={styles.topShoesImg} source={{ uri: `${IMG_HOST}/${goods.img}` }} />
								<Text style={styles.topShoesName}>
									{ goods.name }
								</Text>
							</TouchableOpacity>
						))
					}
					{
						// more
					}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => { }}
						style={styles.topShoesCell}
					>
						<View style={styles.topShoesMore}>
							<Text style={styles.topShoesMoreText}>
								MORE
							</Text>
						</View>	
					</TouchableOpacity>
				</View>
				{
					// Most Popular
				}
				<Text style={styles.headerTxt}>
					Most Popular
				</Text>
				<View style={styles.topGoodsColorContainer}>
					{
						topGoodsColor.map((goodsColor, i) => (
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => {}}
								style={styles.topGoodsColorCell}
								key={`item1 ${i}`}
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
				{
					// Featured
				}
				<Text style={styles.headerTxt}>
					Featured
				</Text>
				<View style={{ backgroundColor: '#C2C4CA', height: 1, marginTop: toDips(16), }} />
			</View>
		);
	}

	renderGoodsRow({ item: { arr }, index }) {
		return (
			<View style={styles.featuredShoesCellRow}>
				<View style={[styles.featuredShoesCell, styles.featuredShoesCellLeft]}>
					<Image style={styles.featuredShoesImg} source={{ uri: arr[0].img }} />
					<View style={styles.featuredShoesNameContainer}>
						<Text style={styles.featuredShoesName} numberOfLines={2}>
							{ arr[0].name }
						</Text>
					</View>
					<View style={styles.featuredShoesInfo}>
						<Text style={styles.featuredShoesPrice}>
							from $<Text style={styles.featuredShoesBigPrice}>{ arr[0].price }</Text>
						</Text>
						<Text style={styles.featuredShoesNumShop}>
							{ arr[0].numShops } shops
						</Text>
					</View>
				</View>
				{
					arr[1] && (
						<View style={styles.featuredShoesCell}>
							<Image style={styles.featuredShoesImg} source={{ uri: arr[1].img }} />
							<View style={styles.featuredShoesNameContainer}>
								<Text style={styles.featuredShoesName} numberOfLines={2}>
									{ arr[1].name }
								</Text>
							</View>
							<View style={styles.featuredShoesInfo}>
								<Text style={styles.featuredShoesPrice}>
									from $<Text style={styles.featuredShoesBigPrice}>{ arr[1].price }</Text>
								</Text>
								<Text style={styles.featuredShoesNumShop}>
									{ arr[1].numShops } shops
								</Text>
							</View>
						</View>
					)
				}
			</View>
		);
	}

	render() {
		const { featuredShoesArr } = this.state;
		const featuredShoesArrArr = [];
		let index = 0;
		while (featuredShoesArr.length > 0) {
			featuredShoesArrArr.push({
				key: `featuredShoes${index++}`,
				arr: featuredShoesArr.splice(0, 2),
			});
		}
		// const goodsItemHeight = toDips(473);
		return (
			<FlatList
				data={featuredShoesArrArr}
				// extraData={this.state}
				// keyExtractor={this._keyExtractor}
				renderItem={this.renderGoodsRow}
				ItemSeparatorComponent={() => <View style={{ backgroundColor: '#C2C4CA', height: 1, }} />}
				// 列表为空时渲染该组件
				// ListEmptyComponent={() => {}}
				ListHeaderComponent={() => {
					return this.renderHeader();
				}}
				// getItemLayout={(data, index) => (
				// 	{ length: goodsItemHeight, offset: goodsItemHeight * index, index }
				// )}
			/>
		);
	}

	onGoodsColorPressed(goodsColorId) {
		const { navigate } = this.props.navigation;
		navigate({
			routeName: 'GoodsTypeScene',
			params: {
				// mode: 'modal',
				goodsColorId,
			},
		});
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
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
	topStyleContainer: {
		marginTop: toDips(12),
	},
	headerTxt: {
		fontSize: getFontSize(34),
		marginLeft: toDips(32),
		marginTop: toDips(16),
	},
	topShoesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	topShoesCell: {
		width: toDips(187.5),
		marginTop: toDips(16),
		justifyContent: 'center',
		alignItems: 'center',
	},
	topShoesMore: {
		width: toDips(96),
		height: toDips(80),
		backgroundColor: '#F3F1F4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	topShoesMoreText: {
		fontSize: getFontSize(24),
		color: '#4A4A4A',
	},
	topShoesImg: {
		width: toDips(96),
		height: toDips(96),
	},
	topShoesName: {
		fontSize: getFontSize(20),
		marginTop: toDips(16),
	},
	topGoodsColorContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	topGoodsColorCell: {
		width: toDips(206),
		// height: toDips(290),
		marginLeft: toDips(32),
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