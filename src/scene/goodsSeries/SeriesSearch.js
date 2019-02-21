'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
} from 'react-native';
import { THEME_COLOR, IMG_HOST } from '../../config';
import SearchBar from '../../components/SearchBar';
import { toDips, getFontSize } from '../../utils/dimensions';
import toast from '../../utils/toast';
import { getBrand } from '../../service';

let self = null;

export default class SeriesSearch extends PureComponent {
	
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				backgroundColor: THEME_COLOR,
			},
			headerTitle: <SearchBar onPress={(val) => { self.onSearchBarPress(val); }} title='Search Bar' style={{ width: toDips(600) }} />,
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			brandArr: [],
		};
	}

	async componentDidMount() {
		self = this;
		this.page = 1;
		this.pageSize = 10;

		let result = null;
		try {
			result = await getBrand(this.page, this.pageSize);
		} catch (e) {
			toast(e);
			return;
		}
		this.setState({
			brandArr: result.brandArr.map(data => {
				data.key = data._id;
				return data;
			}),
		});
	}

	onSearchBarPress() {

	}

	async onLoadMore() {
		let result = null;
		try {
			result = await getBrand(this.page + 1, this.pageSize);
		} catch (e) {
			toast(e);
			return;
		}
		if (result.brandArr.length > 0) {
			this.page += 1;
			this.setState({
				brandArr: [...this.state.brandArr, ...result.brandArr.map(data => {
					data.key = data._id;
					return data;
				})],
			});
		}
	}

	renderBrandBlock({ item, index }) {
		if (item.series.length > 0) {
			return (
				<View style={styles.brandContainer}>
					<Image style={styles.imgBrand} source={require('../../imgs/tmp_brand.png')} />
					<View style={styles.seriesContainer}>
						{
							item.series.map(s => (
								<View style={styles.seriesCell} key={s._id}>
									<Image style={styles.imgGoods} source={{ uri: `${IMG_HOST}/${s.img}` }} />
									<Text style={styles.seriesTxt}>
										{ s.name }
									</Text>
								</View>
							))
						}
					</View>
				</View>
			);
		}
	}

	render() {
		// const { navigate, goBack } = this.props.navigation;
		const { brandArr } = this.state;
		return (
			<View style={styles.container}>
				<FlatList
					data={brandArr}
					// extraData={this.state}
					// keyExtractor={this._keyExtractor}
					renderItem={itemData => this.renderBrandBlock(itemData)}
					// ItemSeparatorComponent={() => <View style={{ backgroundColor: '#C2C4CA', height: 1, }} />}
					// 列表为空时渲染该组件
					// ListEmptyComponent={() => {}}
					// ListHeaderComponent={() => this.renderHeader()}
					// getItemLayout={(data, index) => (
					// 	{ length: goodsItemHeight, offset: goodsItemHeight * index, index }
					// )}
					onEndReached={async info => {
						await this.onLoadMore(info);
					}}
					onEndReachedThreshold={0.3}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: THEME_COLOR,
	},
	brandContainer: {
		alignItems: 'center',
		marginTop: toDips(32),
	},
	imgBrand: {
		width: toDips(126),
		height: toDips(72),
	},
	seriesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: toDips(686),
	},
	seriesCell: {
		width: toDips(171.5),
		alignItems: 'center',
		marginTop: toDips(16),
	},
	imgGoods: {
		width: toDips(96),
		height: toDips(96),
	},
	seriesTxt: {
		fontSize: getFontSize(24),
		fontFamily: 'GillSans',
		color: '#252525',
		marginTop: toDips(16),
	},
});
