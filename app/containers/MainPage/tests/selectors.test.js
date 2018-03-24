import { fromJS } from 'immutable';

import {
    selectMain,
    makeSelectTest,
} from '../selectors';

describe('selectMain', () => {
    it('should select the Main state', () => {
        const mainState = fromJS({
            test: 0,
        });
        const mockedState = fromJS({
            main: mainState,
        });
        expect(selectMain(mockedState)).toEqual(mainState);
    });
});

describe('makeSelectTest', () => {
    const testSelector = makeSelectTest();
    it('should select the username', () => {
        const test = 3;
        const mockedState = fromJS({
            main: {
                test,
            },
        });
        expect(testSelector(mockedState)).toEqual(test);
    });
});
