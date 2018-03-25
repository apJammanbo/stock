/*
 * Main Actions
 */

import {
    ADD_DATA_INDEX,
    ADD_NEW_DATA,
} from './constants';

/**
 * dataIndex를 업데이트 하는 액션
 */
export function addDataIndex() {
    return {
        type: ADD_DATA_INDEX,
    };
}

/**
 * @param data - 추가된 데이터
 * 새로운 데이터를 더하는 액션
 */
export function addNewData(data) {
    return {
        type: ADD_NEW_DATA,
        data,
    };
}
