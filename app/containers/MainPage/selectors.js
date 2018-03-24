/**
 * Main selectors
 */

import { createSelector } from 'reselect';

const selectMain = (state) => state.get('main');

const makeSelectTest = () => createSelector(
  selectMain,
  (mainState) => mainState.get('test')
);

export {
  selectMain,
  makeSelectTest,
};
