import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import Chart from '../index';

const props = {
    tradedData: List([]),
};

describe('<Chart />', () => {
    it('<Chart/> 는 <div/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <Chart {...props} />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});
