import { fromJS } from 'immutable';

import {
    selectMain,
    makeSelectDataIndex,
    makeSelectData,
} from '../selectors';

describe('selectMain', () => {
    it('selectMain', () => {
        const mainState = fromJS({
            dataIndex: 0,
        });
        const mockedState = fromJS({
            main: mainState,
        });
        expect(selectMain(mockedState)).toEqual(mainState);
    });
});

describe('makeSelectDataIndex', () => {
    const selector = makeSelectDataIndex();
    it('dataIndex 를 가지고 올 수 있어야 합니다.', () => {
        const dataIndex = 3;
        const mockedState = fromJS({
            main: {
                dataIndex,
            },
        });
        expect(selector(mockedState)).toEqual(dataIndex);
    });
});

describe('makeSelectData', () => {
    const selector = makeSelectData();
    it('data 를 가지고 올 수 있어야 합니다.', () => {
        const data = fromJS([]);
        const mockedState = fromJS({
            main: {
                data,
            },
        });
        expect(selector(mockedState)).toEqual(data);
    });
});
