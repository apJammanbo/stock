import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';
import Bidding from '../index';

const props = {
    buyData: List([]),
    sellData: List([]),
    tradedData: List([]),
    biddingInfo: {
        startPrice: 0,
        totalTrade: 0,
        sumTradePrice: 0,
        maxPrice: 0,
        minPrice: 0,
    },
};

const renderedComponent = shallow(
    <Bidding {...props} />
);

const instance = renderedComponent.instance();

describe('<Bidding />', () => {
    it('<Bidding/> 는 <div/> 를 렌더링 합니다.', () => {
        expect(renderedComponent.type()).toEqual('div');
    });

    it('handleToggleShowCount 결과확인', () => {
        instance.handleToggleShowCount();
        const expectedResult = instance.state.showCount;
        expect(7).toEqual(expectedResult);
    });

    describe('createSellTrs showCount 1', () => {
        it('createSellTrs 결과확인', () => {
            const data = fromJS([]);
            const biddingInfo = {
                startPrice: 0,
                totalTrade: 0,
                sumTradePrice: 0,
                maxPrice: 0,
                minPrice: 0,
            };

            expect(instance.createSellTrs(1, data, biddingInfo, 100).length).toEqual(1);
        });
    });

    describe('createbuyTrs showCount 1', () => {
        it('createSellTrs 결과확인', () => {
            const data = fromJS([]);
            const biddingInfo = {
                startPrice: 0,
                totalTrade: 0,
                sumTradePrice: 0,
                maxPrice: 0,
                minPrice: 0,
            };

            expect(instance.createBuyTrs(1, data, biddingInfo, 100, fromJS([])).length).toEqual(1);
        });
    });

    describe('createSellTrs showCount 2', () => {
        it('createSellTrs 결과확인', () => {
            const data = fromJS([
                { price: 100, quantity: 100, ratio: '1.000' },
            ]);
            const biddingInfo = {
                startPrice: 0,
                totalTrade: 0,
                sumTradePrice: 0,
                maxPrice: 0,
                minPrice: 0,
            };


            expect(instance.createSellTrs(2, data, biddingInfo, 100).length).toEqual(2);
        });
    });

    describe('createbuyTrs showCount 2', () => {
        it('createSellTrs 결과확인', () => {
            const data = fromJS([
                { price: 100, quantity: 100, ratio: '1.000' },
            ]);
            const biddingInfo = {
                startPrice: 0,
                totalTrade: 0,
                sumTradePrice: 0,
                maxPrice: 0,
                minPrice: 0,
            };
            const tradedData = fromJS([

            ]);

            expect(instance.createBuyTrs(2, data, biddingInfo, 100, tradedData).length).toEqual(2);
        });
    });
});
