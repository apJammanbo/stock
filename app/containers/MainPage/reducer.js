/*
 * Main Reducer
 */
import { fromJS } from 'immutable';

import {
    ADD_DATA_INDEX,
} from './constants';

// Init State MainPage
const initialState = fromJS({
    /**
     * 다음 요청시 요청해야 할 데이터 인덱스 입니다.
     */
    dataIndex: 0,
});

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA_INDEX:
            return state.set('dataIndex', state.get('dataIndex') + 1);
        default:
            return state;
    }
}

export default mainReducer;
