import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

describe('<Header />', () => {
    it('<Header/> 는 <header/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <Header />
        );
        expect(renderedComponent.type()).toEqual('header');
    });
});
