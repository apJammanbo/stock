import React from 'react';
import { shallow } from 'enzyme';
import { MainPage, mapDispatchToProps } from '../index';
import { addDataIndex } from '../actions';

describe('<MainPage />', () => {
    // Render Test
    it('<MainPage/> 는 <div/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <MainPage />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});

describe('<MainPge /> mapDispatchToProps', () => {
    // onAddDataIndex Test
    describe('Test onAddDataIndex', () => {
        it('onAddDataIndex가 있어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            expect(result.onAddDataIndex).toBeDefined();
        });

        it('onAddDataIndex가 호출되면 addDataIndex가 호출되어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            result.onAddDataIndex();
            expect(dispatch).toHaveBeenCalledWith(addDataIndex());
        });
    });
});
