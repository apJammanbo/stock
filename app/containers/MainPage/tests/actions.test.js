import {
    ADD_DATA_INDEX,
    ADD_NEW_DATA,
} from '../constants';

import {
    addDataIndex,
    addNewData,
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

    describe('ADD_NEW_DATA', () => {
        it('같은 타입의 결과여야 합니다.', () => {
            const data = {
                type: 'B',
                amount: 100,
                quantity: 100,
                datetime: Date.now(),
            };
            const expectedResult = {
                type: ADD_NEW_DATA,
                data,
            };
            expect(addNewData(data)).toEqual(expectedResult);
        });
    });
});
