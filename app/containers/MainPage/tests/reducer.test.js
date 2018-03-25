import { fromJS } from 'immutable';
import mainReducer from '../reducer';
import {
    addDataIndex,
    addNewData,
} from '../actions';

describe('MainReducer', () => {
    let state;
    beforeEach(() => {
        state = fromJS({
            dataIndex: 0,
            data: [],
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

    it('addNewData 결과값 테스트 ', () => {
        const newData = fromJS({
            type: 'B',
            amount: 100,
            quantity: 100,
            datetime: Date.now(),
        });
        let expectedResult = state.set('data', state.get('data').push(newData));
        expectedResult = expectedResult.set('dataIndex', state.get('dataIndex') + 1);
        expect(mainReducer(state, addNewData(newData))).toEqual(expectedResult);
    });
});
