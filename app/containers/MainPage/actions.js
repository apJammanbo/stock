/*
 * Main Actions
 */

import {
    CHANGE_TEST,
} from './constants';

/**
 * @return {object}
 */
export function testChange() {
    return {
        type: CHANGE_TEST,
    };
}
