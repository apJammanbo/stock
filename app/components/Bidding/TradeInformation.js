/*
 * TradeInformation 거래정보
 */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

class TradeInformation extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const {
            tradedData,
        } = this.props;

        const trs = [];
        for (let i = 0; i < tradedData.size; i += 1) {
            trs.push(
                <tr key={i}>
                    <td className="celrgt">{tradedData.getIn([tradedData.size - i - 1, 'price'])}</td>
                    <td className="celrgt">{tradedData.getIn([tradedData.size - i - 1, 'quantity'])}</td>
                </tr>
            );
        }


        return (
            <td className="pd0 celvat" rowSpan={10} style={{ overflow: 'hidden' }}>
                <table className="tbl_mini_order">
                    <caption><span className="blind">체결량/체결가</span></caption>
                    <colgroup>
                        <col style={{ width: '50%' }} />
                        <col />
                    </colgroup>
                    <thead>
                    <tr>
                        <th>체결가</th>
                        <th>체결량</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trs}
                    </tbody>
                </table>
            </td>
        );
    }
}

TradeInformation.propTypes = {
    /**
     * 거래데이터
     */
    tradedData: ImmutablePropTypes.list,
};

export default TradeInformation;
