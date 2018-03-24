import React from 'react';
import { shallow } from 'enzyme';
import { MainPage, mapDispatchToProps } from '../index';
import { testChange } from '../actions';

describe('<MainPage />', () => {
    it('should render div', () => {
        const renderedComponent = shallow(
            <MainPage />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});

describe('mapDispatchToProps', () => {
    describe('onChangeTest', () => {
        it('should be injected', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            expect(result.onChangeTest).toBeDefined();
        });

        it('should dispatch changeTest when called', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            result.onChangeTest();
            expect(dispatch).toHaveBeenCalledWith(testChange());
        });
    });
});
