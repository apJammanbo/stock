import React from 'react';
import { shallow } from 'enzyme';
import BiddingInformation from '../BiddingInformation';

const props = {
    // 거래데이터
    biddingInfo: {
        startPrice: 0,
        totalTrade: 0,
        sumTradePrice: 0,
        maxPrice: 100,
        minPrice: 200,
        currentTradeData: null,
    },
};

const props2 = {
    // 거래데이터
    biddingInfo: {
        startPrice: 0,
        totalTrade: 0,
        sumTradePrice: 0,
        maxPrice: null,
        minPrice: null,
        currentTradeData: null,
    },
};

describe('<BiddingInformation />', () => {
    const renderedComponent = shallow(
        <BiddingInformation {...props} />
    );

    const renderedComponent2 = shallow(
        <BiddingInformation {...props2} />
    );

    it('<BiddingInformation/> 는 <table/> 를 렌더링 합니다.', () => {
        expect(renderedComponent.type()).toEqual('dl');
    });

    it('show maxprice 100', () => {
        const output = renderedComponent.node.props.children[7].props.children;
        expect(output).toEqual(100);
    });

    it('show maxprice null', () => {
        const output = renderedComponent2.node.props.children[7].props.children;
        expect(output).toEqual('');
    });

    it('show minprice 200', () => {
        const output = renderedComponent.node.props.children[9].props.children;
        expect(output).toEqual(200);
    });

    it('show minprice null', () => {
        const output = renderedComponent2.node.props.children[9].props.children;
        expect(output).toEqual('');
    });
});
