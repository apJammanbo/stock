import { fromJS } from 'immutable';

import mainReducer from '../reducer';
import {
    testChange,
} from '../actions';

describe('MainReducer', () => {
    let state;
    beforeEach(() => {
        state = fromJS({
            test: 0,
        });
    });

    it('should return the initial state', () => {
        const expectedResult = state;
        expect(mainReducer(undefined, {})).toEqual(expectedResult);
    });

    it('should handle the testChange action correctly', () => {
        const expectedResult = state.set('test', 1);
        expect(mainReducer(state, testChange())).toEqual(expectedResult);
    });
});
