/*
 * BiddingFooter
 */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class BiddingFooter extends React.Component { // eslint-disable-line react/prefer-stateless-function

    // 리스트에서 수량의 합계를 구한다.
    sumQuantity = (list) => {
        let sum = 0;
        list.forEach((item) => {
            sum += item.get('quantity');
        });
        return sum;
    }

    /**
     * Render
     */
    render() {
        const {
            buyData,
            sellData,
        } = this.props;

        const sumBuyData = this.sumQuantity(buyData);
        const sumSellData = this.sumQuantity(sellData);

        return (
            <table className="tbl_sum">
                <caption><span className="blind">주문잔량 총 합계</span></caption>
                <colgroup>
                    <col style={{ width: '33%' }} />
                    <col style={{ width: '34%' }} />
                    <col style={{ width: '33%' }} />
                </colgroup>
                <tbody>
                <tr>
                    <td className="celrgt total_num">{sumSellData}</td>
                    <td className="celcnt">주문잔량합계</td>
                    <td className="cellft total_num">{sumBuyData}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

BiddingFooter.propTypes = {
    /**
     * 매수 데이터(B)
     */
    buyData: ImmutablePropTypes.list,
    /**
     * 매도 데이터(S)
     */
    sellData: ImmutablePropTypes.list,
};

export default BiddingFooter;
