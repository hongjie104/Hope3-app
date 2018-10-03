/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


// import React, { Component } from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';

// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//     android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.welcome}>Welcome to React Native!</Text>
//                 <Text style={styles.instructions}>To get started, edit App.js</Text>
//                 <Text style={styles.instructions}>{instructions}</Text>
//             </View>
//         );
//     }
// }



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });


'use strict';

import React, { PureComponent } from 'react';

import { Provider } from 'mobx-react/native';
import stores from './src/store';
import App from './src/app';
// import * as update from './utils/update';

export default class Root extends PureComponent {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // update.start((err) => {
        //  if (err) {
        //      toast(err);
        //  }
        // });
    }

    render() {
        return (
            <Provider { ...stores }>
                <App />
            </Provider>
        );
    }
}