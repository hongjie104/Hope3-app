'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

import { IMG_HOST } from '../../config';
import { toDips, getFontSize } from '../../utils/dimensions';

export default class TopStyle extends PureComponent {

	constructor(props) {
		super(props);
	}

	render() {
		const { topSeriesArr } = this.props;
		return (
			<View style={styles.container}>
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
						onPress={() => {
							const { navigate } = this.props.navigation;
							navigate({
								routeName: 'SeriesSearch',
							});
						}}
						style={styles.topShoesCell}
					>
						<View style={styles.topShoesMore}>
							<Text style={styles.topShoesMoreText}>
								MORE
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingBottom: toDips(16),
	},
	headerTxt: {
		fontSize: getFontSize(34),
		marginLeft: toDips(32),
		marginTop: toDips(16),
		fontFamily: 'GillSans-SemiBold',
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
		fontFamily: 'GillSans',
		fontSize: getFontSize(20),
		marginTop: toDips(16),
	},
});
