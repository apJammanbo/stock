import { Map } from 'immutable';
import { StockApi } from '../index';

describe('StockApi', () => {
    describe('getNewData', () => {
        it('getNewData 가 있어야 합니다.', () => {
            expect(StockApi.getNewData).toBeDefined();
        });

        it('getNewData 가 지정된 결과를 리턴해야합니다.', () => {
            const expectResult = Map({
                type: 'error',
            });
            const result = StockApi.getNewData(0);
            result.then((ret) => {
                    expect(ret.toJS()).toEqual(expectResult.toJS());
                }
            );
        });
    });
});
