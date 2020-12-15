import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initStore } from './js/state/store';

import './css/style.scss';
import CoinsList from './js/components/coins/coins-list';

const store = initStore();

ReactDOM.render(
    <Provider store={store}>
        <CoinsList/>
    </Provider>,
    document.getElementById('app')
);