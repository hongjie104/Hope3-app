'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
} from 'react-native';

import { toDips, getFontSize } from '../../utils/dimensions';
import { IMG_HOST } from '../../config';

export default class SizeSelector extends PureComponent {
	
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Select a size',
	});

	constructor(props) {
		super(props);
		const { goodsArr, targetSize } = props.navigation.state.params;
		// 找出所有的size
		const sizeAndPriceArr = [];
		const skuArr = goodsArr.map(goods => goods.sku);
		let exists = false;
		for (let i = 0; i < skuArr.length; i++) {
			for (let j = 0; j < skuArr[i].length; j++) {
				if (skuArr[i][j].isInStock) {
					exists = false;
					for (let m = 0; m < sizeAndPriceArr.length; m++) {
						if (sizeAndPriceArr[m].size === skuArr[i][j].size) {
							if (sizeAndPriceArr[m].price > skuArr[i][j].price) {
								sizeAndPriceArr[m].price = skuArr[i][j].price;
							}
							exists = true;
							break;
						}
					}
					if (!exists) {
						sizeAndPriceArr.push({
							size: skuArr[i][j].size,
							price: skuArr[i][j].price,
							id: sizeAndPriceArr.length,
							isSelected: skuArr[i][j].size === targetSize,
						});
					}
				}
			}
		}
		this.state = {
			sizeAndPriceArr,
			imgUrl: `${IMG_HOST}/${goodsArr[0].img}`,
		};
	}

	onSizePress(id) {
		const sizeAndPriceArr = [...this.state.sizeAndPriceArr];
		let targetSize = null;
		for (let i = 0; i < sizeAndPriceArr.length; i++) {
			if (sizeAndPriceArr[i].id === id) {
				sizeAndPriceArr[i].isSelected = true;
				targetSize = sizeAndPriceArr[i].size;
			} else {
				sizeAndPriceArr[i].isSelected = false;
			}
		}
		this.setState({ sizeAndPriceArr }, () => {
			const t = setTimeout(() => {
				clearTimeout(t);
				const { state: { params: { onSizeChange } }, goBack } = this.props.navigation;
				onSizeChange && onSizeChange(targetSize);
				goBack();
			}, 50);
		});
	}

	render() {
		const { sizeAndPriceArr, imgUrl } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.container}>
					<Image style={styles.img} source={{ uri: imgUrl }} />
					<View style={styles.goodsNameContainer}>
						<Text style={styles.goodsName}>
							Air Jordan 3 ‘BHM’
						</Text>
					</View>
					<View style={styles.line} />
					<View style={styles.sizeContainer}>
						{
							sizeAndPriceArr.map((sizeAndPrice, index) => (
								<TouchableOpacity
									key={`item${index}`}
									activeOpacity={0.8}
									onPress={() => {
										this.onSizePress(sizeAndPrice.id);
									}}
									style={[styles.sizeCell, sizeAndPrice.isSelected ? styles.sizeCellSelected : null]}
								>
									<Text style={[styles.sizeTxt, sizeAndPrice.isSelected ? styles.sizeTxtSelected : null]}>
										{ sizeAndPrice.size }
									</Text>
									<Text style={[styles.priceTxt, sizeAndPrice.isSelected ? styles.priceTxtSelected : null]}>
										${ sizeAndPrice.price }
									</Text>
								</TouchableOpacity>
							))
						}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	img: {
		width: toDips(290),
		height: toDips(290),
		alignSelf: 'center',
	},
	goodsNameContainer: {
		marginTop: toDips(16),
		alignItems: 'center',
	},
	goodsName: {
		color: 'black',
		fontSize: getFontSize(32),
	},
	line: {
		backgroundColor: '#C2C4CA',
		height: 1,
		width: toDips(750),
		marginTop: toDips(16),
	},
	sizeContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	sizeCell: {
		width: toDips(148),
		height: toDips(148),
		borderColor: '#EAE9E9',
		borderWidth: 2,
		marginTop: toDips(32),
		marginLeft: toDips(32),
		alignItems: 'center',
	},
	sizeCellSelected: {
		backgroundColor: '#D0021B',
	},
	sizeTxt: {
		fontSize: getFontSize(28),
		color: '#4A4A4A',
		marginTop: toDips(32),
	},
	sizeTxtSelected: {
		color: 'white',
	},
	priceTxt: {
		fontSize: getFontSize(28),
		color: '#4A4A4A',
		fontWeight: 'bold',
		marginTop: toDips(4),
	},
	priceTxtSelected: {
		color: 'white',
	},
});
