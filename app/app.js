/**
 * app.js
 * Frontend Entry Point 입니다.
 */

// redux-saga es6 적용으로 필요
import 'babel-polyfill';

// 기본 라이브럴리 임포트
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';

// App Container 임포트
import App from 'containers/App';

// 파비콘과 매니페스트 파일을 불러온다.
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/icon-72x72.png';
import '!file-loader?name=[name].[ext]!./images/icon-96x96.png';
import '!file-loader?name=[name].[ext]!./images/icon-120x120.png';
import '!file-loader?name=[name].[ext]!./images/icon-128x128.png';
import '!file-loader?name=[name].[ext]!./images/icon-144x144.png';
import '!file-loader?name=[name].[ext]!./images/icon-152x152.png';
import '!file-loader?name=[name].[ext]!./images/icon-167x167.png';
import '!file-loader?name=[name].[ext]!./images/icon-180x180.png';
import '!file-loader?name=[name].[ext]!./images/icon-192x192.png';
import '!file-loader?name=[name].[ext]!./images/icon-384x384.png';
import '!file-loader?name=[name].[ext]!./images/icon-512x512.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import '!file-loader?name=[name].[ext]!../data.json';
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './configureStore';

// CSS reset과 기본 Styles
// import './global-styles';
import './stock.css';

// 폰트 옵저버 임포트
const openSansObserver = new FontFaceObserver('Open Sans', {});

// 폰트가 로드 되면  body에 fontLoaded 클래스 적용
openSansObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
}, () => {
    document.body.classList.remove('fontLoaded');
});

// history, store 생성
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
);
