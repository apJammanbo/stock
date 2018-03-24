import {
    CHANGE_TEST,
} from '../constants';

import {
    testChange,
} from '../actions';

describe('Home Actions', () => {
    describe('changeTest', () => {
        it('should return the correct type', () => {
            const expectedResult = {
                type: CHANGE_TEST,
            };

            expect(testChange()).toEqual(expectedResult);
        });
    });
});
