import { StockApi } from '../index';

describe('StockApi', () => {
    describe('getNewData', () => {
        it('getNewData 가 있어야 합니다.', () => {
            expect(StockApi.getNewData).toBeDefined();
        });
    });
});
