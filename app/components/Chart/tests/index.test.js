import React from 'react';
import { shallow } from 'enzyme';
import Infomation from '../index';

describe('<Infomation />', () => {
    it('<Infomation/> 는 <div/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <Infomation />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});
