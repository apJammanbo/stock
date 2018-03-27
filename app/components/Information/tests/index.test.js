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

describe('<Information />', () => {
    it('<Information/> 는 <div/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <Information biddingInfo={biddingInfo} />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});
