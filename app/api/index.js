import axios from 'axios';
import { fromJS } from 'immutable';

export class StockApi {
    /**
     * 서버에서 새로운 데이터를 가지고 온다.
     * @param dataIndex 다음번에 가지고 와야할 데이터 인덱스
     * @return {Promise.<TResult>}
     */
    static getNewData(dataIndex) {
        const promise = axios.get(`/api/data/${dataIndex}`)
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data.data.split('\t');
                    const ret = {
                        type: data[0],
                        price: Number(data[1]),
                        quantity: Number(data[2]),
                        datetime: Date.now(),
                    };
                    return fromJS(ret);
                }
                return fromJS({ type: 'error' });
            })
            .catch(() => fromJS({ type: 'error' }));
        return promise;
    }
}
