/**
 * Main selectors
 */

import { createSelector } from 'reselect';

const selectMain = (state) => state.get('main');

const makeSelectDataIndex = () => createSelector(
  selectMain,
  (mainState) => mainState.get('dataIndex')
);

export {
  selectMain,
  makeSelectDataIndex,
};
