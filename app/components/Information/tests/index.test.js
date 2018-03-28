import React from 'react';
import { shallow } from 'enzyme';
import Information from '../index';

const biddingInfo = {
    startPrice: 0,
    totalTrade: 0,
    sumTradePrice: 0,
    maxPrice: 0,
    minPrice: 0,
    currentTradeData: 0,
};

const renderedComponent = shallow(
    <Information biddingInfo={biddingInfo} />
);

const instance = renderedComponent.instance();

describe('<Information />', () => {
    it('<Information/> 는 <div/> 를 렌더링 합니다.', () => {
        expect(renderedComponent.type()).toEqual('div');
    });
});

describe('getInfo', () => {
    it('getInfo 가 있어야 합니다.', () => {
        expect(instance.getInfo).toBeDefined();
    });

    it('createBiddingInfo 결과값 currentTradeData = null', () => {
        const info = {
            startPrice: 1000,
            totalTrade: 0,
            sumTradePrice: 0,
            maxPrice: 0,
            minPrice: 0,
        };
        const expectedResult = {
            arrow: '',
            color: 'color_white',
            ratio: '',
        };
        expect(instance.getInfo(info)).toEqual(expectedResult);
    });

    it('createBiddingInfo 결과값 currentTradeData = startprice', () => {
        const info = {
            startPrice: 1000,
            totalTrade: 0,
            sumTradePrice: 0,
            maxPrice: 0,
            minPrice: 0,
            currentTradeData: 1000,
        };
        const expectedResult = {
            arrow: '',
            color: '',
            ratio: '0.0000',
        };
        expect(instance.getInfo(info)).toEqual(expectedResult);
    });

    it('createBiddingInfo 결과값 currentTradeData > startprice', () => {
        const info = {
            startPrice: 1000,
            totalTrade: 0,
            sumTradePrice: 0,
            maxPrice: 0,
            minPrice: 0,
            currentTradeData: 2000,
        };
        const expectedResult = {
            arrow: 'up',
            color: 'color_red',
            ratio: '1.0000',
        };
        expect(instance.getInfo(info)).toEqual(expectedResult);
    });

    it('createBiddingInfo 결과값 currentTradeData < startprice', () => {
        const info = {
            startPrice: 2000,
            totalTrade: 0,
            sumTradePrice: 0,
            maxPrice: 0,
            minPrice: 0,
            currentTradeData: 1000,
        };
        const expectedResult = {
            arrow: 'down',
            color: 'color_blue',
            ratio: '-0.5000',
        };
        expect(instance.getInfo(info)).toEqual(expectedResult);
    });
});
