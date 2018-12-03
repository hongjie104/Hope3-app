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
