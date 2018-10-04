'use strict';

import React, { PureComponent } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { toDips } from '../../utils/dimensions';

export default class MainScene extends PureComponent {
	
	static navigationOptions = ({ navigation, screenProps }) => ({
		title: `main scene`,
	});

	constructor(props) {
		super(props);
	}

	render() {
		const { navigate, goBack } = this.props.navigation;
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
					 	<TouchableOpacity activeOpacity={0.8} onPress={() => { this.test && this.test()}}>
							<Image style={styles.swiperImg} source={require('../../imgs/banner_1.jpg')}/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.8} onPress={() => { this.test && this.test()}}>
							<Image style={styles.swiperImg} source={require('../../imgs/banner_2.jpg')}/>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.8} onPress={() => { this.test && this.test()}}>
							<Image style={styles.swiperImg} source={require('../../imgs/banner_3.jpg')}/>
						</TouchableOpacity>
					</Swiper>
				</View>
				{
					// top styles
				}
				<View style={styles.topStyleContainer}>
					<Text style={styles.topStyleTxt}>
						Top Styles
					</Text>
					<View style={styles.shoesContainer}>
						<View style={styles.shoesRowContainer}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style={styles.shoesRowContainer}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => { this.onShoesPressed(); }}
								style={{}}
							>
								<View style={styles.shoesCell}>
									<Image style={styles.shoesImg} source={{ uri: 'http://pa9m48qrj.bkt.clouddn.com/flightclub/378037%20623.jpg?imageView2/2/h/600' }} />
									<Text style={styles.shoesName}>
										Air Jordan
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	}

	onShoesPressed() {
		const { navigate } = this.props.navigation;
		navigate('shoesDetail');
	}

	test() {
		console.warn('aa');
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
	topStyleTxt: {
		fontSize: toDips(34),
		marginLeft: toDips(10),
	},
	shoesContainer: {

	},
	shoesRowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: toDips(10),
	},
	shoesCell: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	shoesImg: {
		width: toDips(120),
		height: toDips(85),
	},
	shoesName: {
		fontSize: toDips(20),
		marginTop: toDips(10),
	},
});