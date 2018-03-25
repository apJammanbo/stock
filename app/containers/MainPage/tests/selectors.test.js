import { fromJS } from 'immutable';

import {
    selectMain,
    makeSelectDataIndex,
} from '../selectors';

describe('selectMain', () => {
    it('should select the Main state', () => {
        const mainState = fromJS({
            dataIndex: 0,
        });
        const mockedState = fromJS({
            main: mainState,
        });
        expect(selectMain(mockedState)).toEqual(mainState);
    });
});

describe('makeSelectTest', () => {
    const selecter = makeSelectDataIndex();
    it('should select the username', () => {
        const dataIndex = 3;
        const mockedState = fromJS({
            main: {
                dataIndex,
            },
        });
        expect(selecter(mockedState)).toEqual(dataIndex);
    });
});
