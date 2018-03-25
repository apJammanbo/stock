/*
 * Main Reducer
 */
import { fromJS } from 'immutable';

import {
    ADD_DATA_INDEX,
    ADD_NEW_DATA,
} from './constants';

// Init State MainPage
const initialState = fromJS({
    /**
     * 다음 요청시 요청해야 할 데이터 인덱스 입니다.
     */
    dataIndex: 0,
    data: [],
});

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA_INDEX:
            return state.set('dataIndex', state.get('dataIndex') + 1);
        case ADD_NEW_DATA:
            // 새로운 데이터를 받아옵니다.
            return addNewData(state, action);
        default:
            return state;
    }
}

/**
 * 새로운 데이터를 받아옵니다.
 */
function addNewData(state, action) {
    let ret = state;
    ret = ret.set('dataIndex', state.get('dataIndex') + 1);
    ret = ret.set('data', state.get('data').push(action.data));
    return ret;
}

export default mainReducer;
