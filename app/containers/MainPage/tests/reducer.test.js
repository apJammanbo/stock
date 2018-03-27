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
            buyData: [],
            sellData: [],
            startPrice: 545,
            tradedData: [],

        });
    });

    it('initial state 확인', () => {
        const expectedResult = state;
        expect(mainReducer(undefined, {}).toJS()).toEqual(expectedResult.toJS());
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

        let dummyState = state;
        dummyState = dummyState.set('data', state.get('data').push(newData));
        let buyData = state.get('buyData');
        const date = Date.now();
        buyData = buyData.push(fromJS({
            type: 'B',
            amount: 100,
            quantity: 100,
            datetime: date,
            ratio: 'NaN',
        }));
        dummyState = dummyState.set('buyData', buyData);
        let expectedResult = dummyState;
        expectedResult = expectedResult.set('dataIndex', state.get('dataIndex') + 1);

        let result = mainReducer(state, addNewData(newData));
        result = result.setIn(['data', 'datetime'], date);
        result = result.setIn(['buyData', 0, 'datetime'], date);
        expect(result.toJS()).toEqual(expectedResult.toJS());
    });
});
