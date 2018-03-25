import { fromJS } from 'immutable';

import mainReducer from '../reducer';
import {
    addDataIndex,
} from '../actions';

describe('MainReducer', () => {
    let state;
    beforeEach(() => {
        state = fromJS({
            dataIndex: 0,
        });
    });

    it('initial state 확인', () => {
        const expectedResult = state;
        expect(mainReducer(undefined, {})).toEqual(expectedResult);
    });

    it('addDataIndex 결과값 테스트 ', () => {
        const expectedResult = state.set('dataIndex', 1);
        expect(mainReducer(state, addDataIndex())).toEqual(expectedResult);
    });
});
