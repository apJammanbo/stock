/*
 * Main Reducer
 */
import { fromJS } from 'immutable';

import {
    CHANGE_TEST,
} from './constants';

// Init State MainPage
const initialState = fromJS({
    test: 0,
});

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TEST:
            return state.set('test', state.get('test') + 1);
        default:
            return state;
    }
}

export default mainReducer;
