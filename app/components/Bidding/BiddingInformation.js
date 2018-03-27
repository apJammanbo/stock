/*
 * BiddingInformation 거래정보
 */

import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../../utils/common';

class BiddingInformation extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const {
            biddingInfo,
        } = this.props;

        return (
            <dl>
                <dt>거래량</dt>
                <dd>{numberWithCommas(biddingInfo.totalTrade)}</dd>
                <dt>거래대금</dt>
                <dd>{numberWithCommas(biddingInfo.sumTradePrice)}</dd>
                <dt>시가</dt>
                <dd>{biddingInfo.startPrice}</dd>
                <dt className="color_red">고가</dt>
                <dd className="color_red">{biddingInfo.maxPrice ? biddingInfo.maxPrice : ''}</dd>
                <dt className="color_blue">저가</dt>
                <dd className="color_blue">{biddingInfo.minPrice ? biddingInfo.minPrice : ''}</dd>
                <dt className="color_red">상한가</dt>
                <dd className="color_red">{(biddingInfo.startPrice + (biddingInfo.startPrice * 0.3)).toFixed()}</dd>
                <dt className="color_blue">하한가</dt>
                <dd className="color_blue">{(biddingInfo.startPrice - (biddingInfo.startPrice * 0.3)).toFixed()}</dd>
            </dl>
        );
    }
}

BiddingInformation.propTypes = {
    /**
     * 거래정보
     */
    biddingInfo: PropTypes.object,
};

export default BiddingInformation;
