import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { MainPage, mapDispatchToProps } from '../index';
import {
    addDataIndex,
    addNewData,
} from '../actions';

// Render Test
describe('<MainPage />', () => {
    // Render Test
    it('<MainPage/> 는 <div/> 를 렌더링 합니다.', () => {
        const renderedComponent = shallow(
            <MainPage dataIndex={0} data={fromJS([])} />
        );
        expect(renderedComponent.type()).toEqual('div');
    });
});

// Functions Test
describe('<MainPage /> Functions', () => {
    describe('componentDidMount', () => {
        it('componentDidMount 가 있어야 합니다.', () => {
            const renderedComponent = shallow(
                <MainPage dataIndex={0} data={fromJS([])} />
            );
            expect(renderedComponent.instance().componentDidMount).toBeDefined();
        });
    });

    describe('handleGetNewData', () => {
        it('handleGetNewData 가 있어야 합니다.', () => {
            const renderedComponent = shallow(
                <MainPage dataIndex={0} data={fromJS([])} />
            );
            expect(renderedComponent.instance().handleGetNewData).toBeDefined();
        });
    });
});


// Props Test
describe('<MainPge /> mapDispatchToProps', () => {
    // onAddDataIndex Test
    describe('Test onAddDataIndex', () => {
        it('onAddDataIndex 가 있어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            expect(result.onAddDataIndex).toBeDefined();
        });

        it('onAddDataIndex 가 호출되면 addDataIndex 가 호출되어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            result.onAddDataIndex();
            expect(dispatch).toHaveBeenCalledWith(addDataIndex());
        });
    });

    // onAddNewData Test
    describe('Test addNewData', () => {
        it('onAddNewData 가 있어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            expect(result.onAddNewData).toBeDefined();
        });

        it('onAddNewData 가 호출되면 addNewData 가 호출되어야 합니다.', () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);
            result.onAddNewData();
            expect(dispatch).toHaveBeenCalledWith(addNewData());
        });
    });
});
