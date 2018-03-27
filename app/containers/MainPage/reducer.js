/*
 * Main Reducer
 */
import { fromJS } from 'immutable';

import {
    ADD_DATA_INDEX,
    ADD_NEW_DATA,
} from './constants';

// Init State MainPage
const initialState = fromJS({
    /**
     * 다음 요청시 요청해야 할 데이터 인덱스 입니다.
     */
    dataIndex: 0,
    /**
     * 전송받은 데이터 입니다.
     */
    data: [],
    /**
     * 매수 데이터(B)
     */
    buyData: [],
    /**
     * 매도 데이터(S)
     */
    sellData: [],
    /**
     * 체결데이터
     */
    tradedData: [],
    /**
     * 시초가를 설정합니다.
     */
    startPrice: 545,
});

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA_INDEX:
            return state.set('dataIndex', state.get('dataIndex') + 1);
        case ADD_NEW_DATA:
            // 새로운 데이터를 받아옵니다.
            return addNewData(state, action);
        default:
            return state;
    }
}

/**
 * 새로운 데이터를 받아옵니다.
 */
function addNewData(state, action) {
    let ret = state;
    let data = action.data;
    // 전송받은 데이터를 data 에 추가한다.
    ret = ret.set('dataIndex', state.get('dataIndex') + 1);
    ret = ret.set('data', state.get('data').push(data));

    // 데이터에 변화율을 주입하다.
    const ratio = ((data.get('price') - state.get('startPrice')) / state.get('startPrice')).toFixed(4);
    data = data.set('ratio', ratio);

    // 주문계산
    if (action.data.get('type') === 'B') {
        return calBuy(ret, data);
    } else if (action.data.get('type') === 'S') {
        return calSell(ret, data);
    }
    return ret;
}


/**
 * 매수 주문 계산
 */
function calBuy(state, stockData) {
    let retState = state;
    let buyData = state.get('buyData');
    let sellData = state.get('sellData');
    let tradedData = state.get('tradedData');
    let data = stockData;

    // 사는 주문이면 파는 주문의 낮은 가격부터(정렬된) 같은가격까지 거래가능
    for (let i = 0; i < sellData.size; i += 1) {
        if (sellData.getIn([i, 'price']) > data.get('price')) {
            // 전송된 사는 주문의 가격보다 리스트의 파는 주문 가격이 높으면 break
            break;
        }

        // 거래를 진행한다.
        if (data.get('quantity') < sellData.getIn([i, 'quantity'])) {
            // trade 추가
            tradedData = tradedData.push(fromJS({
                price: sellData.getIn([i, 'price']), quantity: data.get('quantity'),
            }));
            retState = retState.set('tradedData', tradedData);
            // 전송된 주문 보다 기존 주문의 수량이 많으면 차감하고 종료
            sellData = sellData.setIn([i, 'quantity'], sellData.getIn([i, 'quantity']) - data.get('quantity'));
            return retState.set('sellData', sellData);
        } else if (data.get('quantity') === sellData.getIn([i, 'quantity'])) {
            // trade 추가
            tradedData = tradedData.push(fromJS({
                price: sellData.getIn([i, 'price']), quantity: data.get('quantity'),
            }));
            retState = retState.set('tradedData', tradedData);
            // 수량이 같으면 거래 후 리스트에서 기존 리스트에서 항목을 제거하고 종료
            sellData = sellData.remove(i);
            return retState.set('sellData', sellData);
        }

        // trade 추가
        tradedData = tradedData.push(fromJS({
            price: sellData.getIn([i, 'price']), quantity: sellData.getIn([i, 'quantity']),
        }));
        retState = retState.set('tradedData', tradedData);
        // 전송된 수량이 많으면 차감하고 계속진행한다.
        data = data.set('quantity', data.get('quantity') - sellData.getIn([i, 'quantity']));
        sellData = sellData.remove(i);
        i -= 1;
        retState = retState.set('sellData', sellData);
    }

    // 기존에 같은 금액 데이터가 있는지 찾는다
    const index = buyData.findIndex((item) => item.get('price') === data.get('price'));
    if (index === -1) {
        // 기존에 같은 금액 데이터가 없으면 추가하고 정렬한다.
        buyData = buyData.push(data);
        buyData = sort(buyData, data.get('type'));
    } else {
        // 기존에 같은 금액 데이터가 있으면 수량을 더한다.
        buyData = buyData.setIn([index, 'quantity'], buyData.getIn([index, 'quantity']) + data.get('quantity'));
    }
    return retState.set('buyData', buyData);
}

/**
 * 매도 주문 계산
 */
function calSell(state, stockData) {
    let retState = state;
    let buyData = state.get('buyData');
    let sellData = state.get('sellData');
    let tradedData = state.get('tradedData');
    let data = stockData;

    // 파는 주문이면 사는 주문의 낮은 가격부터(정렬된) 같은가격까지 거래가능
    for (let i = 0; i < buyData.size; i += 1) {
        if (buyData.getIn([i, 'price']) < data.get('price')) {
            // 전송된 파는 주문의 가격보다 리스트의 사는 주문 가격이 낮으면 break
            break;
        }

        // 거래를 진행한다.
        if (data.get('quantity') < buyData.getIn([i, 'quantity'])) {
            // trade 추가
            tradedData = tradedData.push(fromJS({
                price: buyData.getIn([i, 'price']), quantity: data.get('quantity'),
            }));
            retState = retState.set('tradedData', tradedData);
            // 전송된 주문 보다 기존 주문의 수량이 많으면 차감하고 종료
            buyData = buyData.setIn([i, 'quantity'], buyData.getIn([i, 'quantity']) - data.get('quantity'));
            return retState.set('buyData', buyData);
        } else if (data.get('quantity') === buyData.getIn([i, 'quantity'])) {
            // trade 추가
            tradedData = tradedData.push(fromJS({
                price: buyData.getIn([i, 'price']), quantity: data.get('quantity'),
            }));
            retState = retState.set('tradedData', tradedData);
            // 수량이 같으면 거래 후 리스트에서 기존 리스트에서 항목을 제거하고 종료
            buyData = buyData.remove(i);
            return retState.set('buyData', buyData);
        }
        // trade 추가
        tradedData = tradedData.push(fromJS({
            price: buyData.getIn([i, 'price']), quantity: buyData.getIn([i, 'quantity']),
        }));
        retState = retState.set('tradedData', tradedData);
        // 전송된 수량이 많으면 차감하고 계속진행한다.
        data = data.set('quantity', data.get('quantity') - buyData.getIn([i, 'quantity']));
        buyData = buyData.remove(i);
        i -= 1;
        retState = retState.set('buyData', buyData);
    }

    // 기존에 같은 금액 데이터가 있는지 찾는다
    const index = sellData.findIndex((item) => item.get('price') === data.get('price'));
    if (index === -1) {
        // 기존에 같은 금액 데이터가 없으면 추가하고 정렬한다.
        sellData = sellData.push(data);
        sellData = sort(sellData, data.get('type'));
    } else {
        // 기존에 같은 금액 데이터가 있으면 수량을 더한다.
        sellData = sellData.setIn([index, 'quantity'], sellData.getIn([index, 'quantity']) + data.get('quantity'));
    }
    return retState.set('sellData', sellData);
}

/**
 * 데이터 정렬
 */
function sort(list, type) {
    let items = list;
    if (type === 'B') {
        // 사는데이터는 내림차순 정렬한다.
        items = items.sort((a, b) => {
            if (a.get('price') > b.get('price')) { return -1; }
            if (a.get('price') < b.get('price')) { return 1; }
            return 0;
        });
    } else if (type === 'S') {
        // 파는 데이터는 내림차순 정렬한다.
        items = items.sort((a, b) => {
            if (a.get('price') < b.get('price')) { return -1; }
            if (a.get('price') > b.get('price')) { return 1; }
            return 0;
        });
    }
    return items;
}

export default mainReducer;
