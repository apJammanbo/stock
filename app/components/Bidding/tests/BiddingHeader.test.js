import React from 'react';
import { shallow } from 'enzyme';
import BiddingHeader from '../BiddingHeader';

const props = {
    showCount: 7,
    onToggleShowCount: () => { },
};


describe('<BiddingHeader />', () => {
    const renderedComponent = shallow(
        <BiddingHeader {...props} />
    );

    it('<BiddingHeader/> 는 <div/> 를 렌더링 합니다.', () => {
        expect(renderedComponent.type()).toEqual('div');
    });

    it('show count 7', () => {
        const output = renderedComponent.node.props.children[1].props.children;
        expect(output).toEqual('5호가');
    });

    it('show count 5', () => {
        const renderedComponent2 = shallow(
            <BiddingHeader showCount={5} onToggleShowCount={() => {}} />
        );
        expect(renderedComponent2.text()).toEqual('일반호가7호가');
    });
});
