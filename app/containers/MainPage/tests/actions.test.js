import {
    ADD_DATA_INDEX,
} from '../constants';

import {
    addDataIndex,
} from '../actions';

describe('Main Actions', () => {
    describe('ADD_DATA_INDEX', () => {
        it('같은 타입의 결과여야 합니다.', () => {
            const expectedResult = {
                type: ADD_DATA_INDEX,
            };
            expect(addDataIndex()).toEqual(expectedResult);
        });
    });
});
