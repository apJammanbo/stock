/**
 * Main selectors
 */

import { createSelector } from 'reselect';

const selectMain = (state) => state.get('main');

// dataIndex
const makeSelectDataIndex = () => createSelector(
    selectMain,
    (mainState) => mainState.get('dataIndex')
);

// data
const makeSelectData = () => createSelector(
    selectMain,
    (mainState) => mainState.get('data')
);

export {
    selectMain,
    makeSelectDataIndex,
    makeSelectData,
};
