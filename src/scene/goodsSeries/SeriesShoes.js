'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	SafeAreaView,
	FlatList,
} from 'react-native';
import { THEME_COLOR, IMG_HOST } from '../../config';
import SearchBar from '../../components/SearchBar';
import GoodsCell from '../../components/GoodsCell';
import { toDips, getFontSize } from '../../utils/dimensions';

export default class SeriesShoes extends PureComponent {
	
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

	onLoadMore() {
		
	}

	renderGoods(item, isLeft = false) {
		if (item) {
			return (
				<GoodsCell
					goods={item}
					style={isLeft ? styles.featuredShoesCellLeft : null}
					onPress={(goods) => {
						this.onGoodsColorPressed(goods._id, goods.goods_type_id);
					}}
				/>
			);
		}
	}

	renderGoodsRow({ item: { arr }, index }) {
		return (
			<View style={styles.shoesCellRow}>
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
		const { navigate, goBack } = this.props.navigation;
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={[1,2,3,4,5]}
					// extraData={this.state}
					// keyExtractor={this._keyExtractor}
					renderItem={itemData => this.renderGoodsRow(itemData)}
					ItemSeparatorComponent={() => <View style={{ backgroundColor: '#C2C4CA', height: 1, }} />}
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
					// onRefresh={async () => {
					// 	await this.onRefresh();
					// }}
					// refreshing={refreshing}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: THEME_COLOR,
	},
	shoesCellRow: {
		width: toDips(750),
		// height: toDips(473),
		flexDirection: 'row',
		backgroundColor: 'white',
	},
});
