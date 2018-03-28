/*
 * Main Reducer
 */
import { fromJS } from 'immutable';

import {
    ADD_DATA_INDEX,
    ADD_NEW_DATA,
} from './constants';

import {
    addNewData,
} from './logic';

// Init State MainPage
const initialState = fromJS({
    /**
     * 다음 요청시 요청해야 할 데이터 인덱스 입니다.
     */
    dataIndex: 0,
    /**
     * 전송받은 데이터 입니다.
     */
    data: [],
    /**
     * 매수 데이터(B)
     */
    buyData: [],
    /**
     * 매도 데이터(S)
     */
    sellData: [],
    /**
     * 체결데이터
     */
    tradedData: [],
    /**
     * 시초가를 설정합니다.
     */
    startPrice: 545,
});

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA_INDEX:
            return state.set('dataIndex', state.get('dataIndex') + 1);
        case ADD_NEW_DATA:
            // 새로운 데이터를 받아옵니다.
            return addNewData(state, action.data);
        default:
            return state;
    }
}

export default mainReducer;
