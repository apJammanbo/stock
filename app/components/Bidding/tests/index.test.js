import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
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

describe('<Bidding />', () => {
    it('<Bidding/> 는 <div/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <Bidding {...props} />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});
