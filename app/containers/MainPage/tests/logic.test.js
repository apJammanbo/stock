/**
 * Logic Test
 */
import { fromJS } from 'immutable';
import {
    addNewData,
    calBuy,
    calSell,
    sort,
} from '../logic';

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

describe('addNewData', () => {
    it('addNewData (초기값:매도) 결과값', () => {
        const now = Date.now();
        const data = fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = initialState;
        expectedResult = expectedResult.set('dataIndex', 1);
        expectedResult = expectedResult.set('data', expectedResult.get('data').push(data));
        expectedResult = expectedResult.set('buyData', expectedResult.get('buyData').push(fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
            ratio: '-0.4495',
        })));

        expect(addNewData(initialState, data)).toEqual(expectedResult);
    });

    it('addNewData (초기값:매도) 결과값 동일가격 / 동일수량', () => {
        const now = Date.now();
        const data1 = fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let state = initialState;
        state = state.set('dataIndex', 1);
        state = state.set('data', state.get('data').push(data1));
        state = state.set('buyData', state.get('buyData').push(fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: Date.now(),
            ratio: '-0.4495',
        })));

        const data2 = fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = state;
        expectedResult = expectedResult.set('dataIndex', 2);
        expectedResult = expectedResult.set('data', state.get('data').push(data2));
        expectedResult = expectedResult.set('buyData', fromJS([]));
        expectedResult = expectedResult.set('tradedData', expectedResult.get('tradedData').push(fromJS({
            price: 300,
            quantity: 100,
        })));

        expect(addNewData(state, data2)).toEqual(expectedResult);
    });

    it('addNewData (초기값:매도) 결과값 동일가격 / 수량 : 매수 > 매도 ', () => {
        const now = Date.now();
        const data1 = fromJS({
            type: 'B',
            price: 300,
            quantity: 200,
            datetime: now,
        });

        let state = initialState;
        state = state.set('dataIndex', 1);
        state = state.set('data', state.get('data').push(data1));
        state = state.set('buyData', state.get('buyData').push(fromJS({
            type: 'B',
            price: 300,
            quantity: 200,
            datetime: Date.now(),
            ratio: '-0.4495',
        })));

        const data2 = fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = state;
        expectedResult = expectedResult.set('dataIndex', 2);
        expectedResult = expectedResult.set('data', state.get('data').push(data2));
        expectedResult = expectedResult.setIn(['buyData', 0, 'quantity'], 100);
        expectedResult = expectedResult.set('tradedData', expectedResult.get('tradedData').push(fromJS({
            price: 300,
            quantity: 100,
        })));

        expect(addNewData(state, data2)).toEqual(expectedResult);
    });

    it('addNewData (초기값:매도) 결과값 동일가격 / 수량 : 매수 < 매도 ', () => {
        const now = Date.now();
        const data1 = fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let state = initialState;
        state = state.set('dataIndex', 1);
        state = state.set('data', state.get('data').push(data1));
        state = state.set('buyData', state.get('buyData').push(fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: Date.now(),
            ratio: '-0.4495',
        })));

        const data2 = fromJS({
            type: 'S',
            price: 300,
            quantity: 200,
            datetime: now,
        });

        let expectedResult = state;
        expectedResult = expectedResult.set('dataIndex', 2);
        expectedResult = expectedResult.set('data', state.get('data').push(data2));
        expectedResult = expectedResult.set('buyData', fromJS([]));
        expectedResult = expectedResult.set('sellData', fromJS([{
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
            ratio: '-0.4495',
        }]));
        expectedResult = expectedResult.set('tradedData', expectedResult.get('tradedData').push(fromJS({
            price: 300,
            quantity: 100,
        })));

        expect(addNewData(state, data2)).toEqual(expectedResult);
    });

    it('addNewData (초기값:매수) 결과값', () => {
        const now = Date.now();
        const data = fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = initialState;
        expectedResult = expectedResult.set('dataIndex', 1);
        expectedResult = expectedResult.set('data', expectedResult.get('data').push(data));
        expectedResult = expectedResult.set('sellData', expectedResult.get('sellData').push(fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
            ratio: '-0.4495',
        })));

        expect(addNewData(initialState, data)).toEqual(expectedResult);
    });

    it('addNewData (초기값:매수) 결과값 동일가격 / 동일수량', () => {
        const now = Date.now();
        const data1 = fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let state = initialState;
        state = state.set('dataIndex', 1);
        state = state.set('data', state.get('data').push(data1));
        state = state.set('sellData', state.get('sellData').push(fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: Date.now(),
            ratio: '-0.4495',
        })));

        const data2 = fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = state;
        expectedResult = expectedResult.set('dataIndex', 2);
        expectedResult = expectedResult.set('data', state.get('data').push(data2));
        expectedResult = expectedResult.set('sellData', fromJS([]));
        expectedResult = expectedResult.set('tradedData', expectedResult.get('tradedData').push(fromJS({
            price: 300,
            quantity: 100,
        })));

        expect(addNewData(state, data2)).toEqual(expectedResult);
    });

    it('addNewData (초기값:매수) 결과값 동일가격 / 수량 : 매수 < 매도 ', () => {
        const now = Date.now();
        const data1 = fromJS({
            type: 'S',
            price: 300,
            quantity: 200,
            datetime: now,
        });

        let state = initialState;
        state = state.set('dataIndex', 1);
        state = state.set('data', state.get('data').push(data1));
        state = state.set('sellData', state.get('sellData').push(fromJS({
            type: 'S',
            price: 300,
            quantity: 200,
            datetime: Date.now(),
            ratio: '-0.4495',
        })));

        const data2 = fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = state;
        expectedResult = expectedResult.set('dataIndex', 2);
        expectedResult = expectedResult.set('data', state.get('data').push(data2));
        expectedResult = expectedResult.setIn(['sellData', 0, 'quantity'], 100);
        expectedResult = expectedResult.set('tradedData', expectedResult.get('tradedData').push(fromJS({
            price: 300,
            quantity: 100,
        })));

        expect(addNewData(state, data2)).toEqual(expectedResult);
    });

    it('addNewData (초기값:매수) 결과값 동일가격 / 수량 : 매수 > 매도 ', () => {
        const now = Date.now();
        const data1 = fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let state = initialState;
        state = state.set('dataIndex', 1);
        state = state.set('data', state.get('data').push(data1));
        state = state.set('sellData', state.get('sellData').push(fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: Date.now(),
            ratio: '-0.4495',
        })));

        const data2 = fromJS({
            type: 'B',
            price: 300,
            quantity: 200,
            datetime: now,
        });

        let expectedResult = state;
        expectedResult = expectedResult.set('dataIndex', 2);
        expectedResult = expectedResult.set('data', state.get('data').push(data2));
        expectedResult = expectedResult.set('sellData', fromJS([]));
        expectedResult = expectedResult.set('buyData', fromJS([{
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
            ratio: '-0.4495',
        }]));
        expectedResult = expectedResult.set('tradedData', expectedResult.get('tradedData').push(fromJS({
            price: 300,
            quantity: 100,
        })));

        expect(addNewData(state, data2)).toEqual(expectedResult);
    });
});

describe('calcBuy', () => {
    it('calcBuy (초기값:매수) 결과값', () => {
        const now = Date.now();
        const data = fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = initialState;
        expectedResult = expectedResult.set('dataIndex', 0);
        expectedResult = expectedResult.set('buyData', expectedResult.get('buyData').push(fromJS({
            type: 'B',
            price: 300,
            quantity: 100,
            datetime: now,
        })));

        expect(calBuy(initialState, data)).toEqual(expectedResult);
    });
});

describe('calcSell', () => {
    it('calcSell (초기값:매도) 결과값', () => {
        const now = Date.now();
        const data = fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
        });

        let expectedResult = initialState;
        expectedResult = expectedResult.set('dataIndex', 0);
        expectedResult = expectedResult.set('sellData', expectedResult.get('sellData').push(fromJS({
            type: 'S',
            price: 300,
            quantity: 100,
            datetime: now,
        })));

        expect(calSell(initialState, data)).toEqual(expectedResult);
    });
});

describe('sort', () => {
    it('sort type B -> length 0', () => {
        const state = fromJS([]);
        expect(sort(state, 'B')).toEqual(state);
    });

    it('sort type S -> length 0', () => {
        const state = fromJS([]);
        expect(sort(state, 'S')).toEqual(state);
    });

    it('sort type B -> length 1', () => {
        const state = fromJS([
            { price: 300 }]);
        expect(sort(state, 'B')).toEqual(state);
    });

    it('sort type S -> length 1', () => {
        const state = fromJS([
            { price: 300 }]);
        expect(sort(state, 'S')).toEqual(state);
    });

    it('sort type B length 5', () => {
        const state = fromJS([
            { price: 100 },
            { price: 200 },
            { price: 300 },
            { price: 400 },
            { price: 500 },
        ]);

        const expectedResult = fromJS([
            { price: 500 },
            { price: 400 },
            { price: 300 },
            { price: 200 },
            { price: 100 },
        ]);
        expect(sort(state, 'B')).toEqual(expectedResult);
    });

    it('sort type S length 5', () => {
        const state = fromJS([
            { price: 500 },
            { price: 400 },
            { price: 300 },
            { price: 200 },
            { price: 100 },
        ]);

        const expectedResult = fromJS([
            { price: 100 },
            { price: 200 },
            { price: 300 },
            { price: 400 },
            { price: 500 },
        ]);
        expect(sort(state, 'S')).toEqual(expectedResult);
    });

    it('sort type B length 6', () => {
        const state = fromJS([
            { price: 200 },
            { price: 100 },
            { price: 300 },
            { price: 400 },
            { price: 300 },
            { price: 500 },
        ]);

        const expectedResult = fromJS([
            { price: 500 },
            { price: 400 },
            { price: 300 },
            { price: 300 },
            { price: 200 },
            { price: 100 },
        ]);
        expect(sort(state, 'B')).toEqual(expectedResult);
    });

    it('sort type S length 6', () => {
        const state = fromJS([
            { price: 500 },
            { price: 100 },
            { price: 300 },
            { price: 400 },
            { price: 300 },
            { price: 200 },
        ]);

        const expectedResult = fromJS([
            { price: 100 },
            { price: 200 },
            { price: 300 },
            { price: 300 },
            { price: 400 },
            { price: 500 },
        ]);
        expect(sort(state, 'S')).toEqual(expectedResult);
    });
});
