'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import { toDips, getFontSize } from '../../utils/dimensions';

export default class SizeSelector extends PureComponent {
	
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Select a size',
	});

	constructor(props) {
		super(props);
		this.state = {
			sizeAndPriceArr: [
				{
					id: 1,
					size: '9.5',
					price: 340.00,
					isSelected: true,
				},
				{
					id: 2,
					size: '9.5',
					price: 340.00,
				},
				{
					id: 3,
					size: '9.5',
					price: 340.00,
				},
				{
					id: 4,
					size: '9.5',
					price: 340.00,
				},
				{
					id: 5,
					size: '9.5',
					price: 340.00,
				},
			],
		};
	}

	onSizePress(id) {
		const sizeAndPriceArr = [...this.state.sizeAndPriceArr];
		for (let i = 0; i < sizeAndPriceArr.length; i++) {
			sizeAndPriceArr[i].isSelected = sizeAndPriceArr[i].id === id;
		}
		this.setState({ sizeAndPriceArr });
	}

	render() {
		// const { navigate, goBack } = this.props.navigation;
		const { sizeAndPriceArr } = this.state;
		return (
			<View style={styles.container}>
				<Image style={styles.img} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/eastbay/55088031.jpg' }} />
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
			</View>
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
