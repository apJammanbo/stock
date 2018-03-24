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

// Language Provider 임포트
import LanguageProvider from 'containers/LanguageProvider';

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

// 다국어 지원을 위한 i18n messages
import { translationMessages } from './i18n';

// CSS reset과 기본 Styles
import './global-styles';

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

const render = (messages) => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={messages}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE
    );
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render(translationMessages);
    });
}

// Intl 적용 체크
if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(import('intl'));
    }))
        .then(() => Promise.all([
            import('intl/locale-data/jsonp/ko.js'),
            import('intl/locale-data/jsonp/en.js'),
        ]))
        .then(() => render(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    render(translationMessages);
}

