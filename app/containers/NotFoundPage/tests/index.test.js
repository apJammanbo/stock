/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../index';

// Render NotFound
describe('<NotFound />', () => {
    // Render Test
    it('<NotFound/> 는 <div/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <NotFound />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});
