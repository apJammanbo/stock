import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';
import BiddingFooter from '../BiddingFooter';

const props = {
    buyData: List([]),
    sellData: List([]),
};


describe('<BiddingFooter />', () => {
    const renderedComponent = shallow(
        <BiddingFooter {...props} />
    );
    const instance = renderedComponent.instance();

    it('<BiddingFooter/> 는 <table/> 를 렌더링 합니다.', () => {
        expect(renderedComponent.type()).toEqual('table');
    });

    describe('Test sumQuantity', () => {
        it('sumQuantity - list의 항목이 없으면 0을 리턴해야합니다.', () => {
            const expectResult = instance.sumQuantity(fromJS([]));
            expect(expectResult).toEqual(0);
        });

        it('sumQuantity - list의 결과값확인', () => {
            const input = fromJS([
                { quantity: 100 },
                { quantity: 50 },
            ]);
            const expectResult = instance.sumQuantity(input);
            expect(expectResult).toEqual(150);
        });
    });
});
