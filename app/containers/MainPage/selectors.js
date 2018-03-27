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

// buy(B) data
const makeSelectBuyData = () => createSelector(
    selectMain,
    (mainState) => mainState.get('buyData')
);

// buy(B) data
const makeSelectSellData = () => createSelector(
    selectMain,
    (mainState) => mainState.get('sellData')
);

// start price
const makeSelectStartPrice = () => createSelector(
    selectMain,
    (mainState) => mainState.get('startPrice')
);

const makeSelectTradedData = () => createSelector(
    selectMain,
    (mainState) => mainState.get('tradedData')
);

export {
    selectMain,
    makeSelectDataIndex,
    makeSelectData,
    makeSelectBuyData,
    makeSelectSellData,
    makeSelectStartPrice,
    makeSelectTradedData,
};
