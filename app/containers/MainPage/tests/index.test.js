import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import { MainPage, mapDispatchToProps } from '../index';
import {
    addDataIndex,
    addNewData,
} from '../actions';

const props = {
    dataIndex: 0,
    buyData: List([]),
    sellData: List([]),
    startPrice: 100,
    tradedData: List([]),
};

const renderedComponent = shallow(
    <MainPage {...props} />
);

const instance = renderedComponent.instance();

// Render Test
describe('<MainPage />', () => {
    // Render Test
    it('<MainPage/> 는 <div/> 를 렌더링 합니다.', () => {
        expect(renderedComponent.type()).toEqual('div');
    });
});

// Functions Test
describe('<MainPage /> Functions', () => {
    describe('componentDidMount', () => {
        it('componentDidMount 가 있어야 합니다.', () => {
            expect(instance.componentDidMount).toBeDefined();
        });
    });

    describe('handleGetNewData', () => {
        it('handleGetNewData 가 있어야 합니다.', () => {
            expect(instance.handleGetNewData).toBeDefined();
        });
    });

    describe('createBiddingInfo', () => {
        it('createBiddingInfo 가 있어야 합니다.', () => {
            expect(instance.createBiddingInfo).toBeDefined();
        });

        it('createBiddingInfo 결과값', () => {
            const tradeData = fromJS([
                { price: 1000, quantity: 100 },
                { price: 500, quantity: 50 },
            ]);
            const expectedResult = {
                currentTradeData: 500,
                maxPrice: 1000,
                minPrice: 500,
                startPrice: 1000,
                sumTradePrice: 125000,
                totalTrade: 150,
            };
            expect(instance.createBiddingInfo(1000, tradeData)).toEqual(expectedResult);
        });
    });
});


// Props Test
describe('<MainPge /> mapDispatchToProps', () => {
    // onAddDataIndex Test
    describe('Test onAddDataIndex', () => {
        it('onAddDataIndex 가 있어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            expect(result.onAddDataIndex).toBeDefined();
        });

        it('onAddDataIndex 가 호출되면 addDataIndex 가 호출되어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            result.onAddDataIndex();
            expect(dispatch).toHaveBeenCalledWith(addDataIndex());
        });
    });

    // onAddNewData Test
    describe('Test addNewData', () => {
        it('onAddNewData 가 있어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            expect(result.onAddNewData).toBeDefined();
        });

        it('onAddNewData 가 호출되면 addNewData 가 호출되어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            result.onAddNewData();
            expect(dispatch).toHaveBeenCalledWith(addNewData());
        });
    });
});
