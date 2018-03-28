import { fromJS } from 'immutable';

import {
    selectMain,
    makeSelectDataIndex,
    makeSelectData, makeSelectBuyData, makeSelectSellData, makeSelectStartPrice, makeSelectTradedData,
} from '../selectors';

describe('selectMain', () => {
    it('selectMain', () => {
        const mainState = fromJS({
            dataIndex: 0,
        });
        const mockedState = fromJS({
            main: mainState,
        });
        expect(selectMain(mockedState)).toEqual(mainState);
    });
});

describe('makeSelectDataIndex', () => {
    const selector = makeSelectDataIndex();
    it('dataIndex 를 가지고 올 수 있어야 합니다.', () => {
        const dataIndex = 3;
        const mockedState = fromJS({
            main: {
                dataIndex,
            },
        });
        expect(selector(mockedState)).toEqual(dataIndex);
    });
});

describe('makeSelectData', () => {
    const selector = makeSelectData();
    it('data 를 가지고 올 수 있어야 합니다.', () => {
        const data = fromJS([]);
        const mockedState = fromJS({
            main: {
                data,
            },
        });
        expect(selector(mockedState)).toEqual(data);
    });
});

describe('makeSelectBuyData', () => {
    const selector = makeSelectBuyData();
    it('buyData 를 가지고 올 수 있어야 합니다.', () => {
        const buyData = fromJS([]);
        const mockedState = fromJS({
            main: {
                buyData,
            },
        });
        expect(selector(mockedState)).toEqual(buyData);
    });
});

describe('makeSelectSellData', () => {
    const selector = makeSelectSellData();
    it('sellData 를 가지고 올 수 있어야 합니다.', () => {
        const sellData = fromJS([]);
        const mockedState = fromJS({
            main: {
                sellData,
            },
        });
        expect(selector(mockedState)).toEqual(sellData);
    });
});

describe('makeSelectStartPrice', () => {
    const selector = makeSelectStartPrice();
    it('startPrice 를 가지고 올 수 있어야 합니다.', () => {
        const startPrice = 100;
        const mockedState = fromJS({
            main: {
                startPrice,
            },
        });
        expect(selector(mockedState)).toEqual(startPrice);
    });
});

describe('makeSelectTradedData', () => {
    const selector = makeSelectTradedData();
    it('tradedData 를 가지고 올 수 있어야 합니다.', () => {
        const tradedData = fromJS([]);
        const mockedState = fromJS({
            main: {
                tradedData,
            },
        });
        expect(selector(mockedState)).toEqual(tradedData);
    });
});
