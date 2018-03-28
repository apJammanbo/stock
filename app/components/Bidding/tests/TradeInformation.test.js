import React from 'react';
import { shallow } from 'enzyme';
import { List, fromJS } from 'immutable';
import TradeInformation from '../TradeInformation';

const tradedData = fromJS([
    { price: 100, quantity: 50 },
    { price: 200, quantity: 60 },
    { price: 300, quantity: 70 },
]);

describe('<TradeInformation />', () => {
    it('<TradeInformation/> 는 <td/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <TradeInformation tradedData={List([])} />
        );
        expect(renderedComponent.type()).toEqual('td');
    });

    it('trade data count 0', () => {
        const renderedComponent = shallow(
            <TradeInformation tradedData={List([])} />
        );
        const body = renderedComponent.node.props.children.props.children[3];
        expect(body.props.children.length).toEqual(0);
    });

    it('trade data count 10', () => {
        const renderedComponent = shallow(
            <TradeInformation tradedData={tradedData} />
        );
        const body = renderedComponent.node.props.children.props.children[3];
        expect(body.props.children.length).toEqual(3);
    });
});
