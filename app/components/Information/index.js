/*
 * Information 상단의 정보를 나타냅니다.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas } from '../../utils/common';

class Information extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const {
            biddingInfo,
        } = this.props;

        let color = 'color_white';
        let ratio = '';
        let arrow = '';
        if (biddingInfo.currentTradeData) {
            if (biddingInfo.startPrice < biddingInfo.currentTradeData) {
                color = 'color_red';
                arrow = 'up';
            } else if (biddingInfo.startPrice > biddingInfo.currentTradeData) {
                color = 'color_blue';
                arrow = 'down';
            } else {
                color = '';
            }

            ratio = ((biddingInfo.currentTradeData - biddingInfo.startPrice) / biddingInfo.startPrice).toFixed(4);
        }

        return (
            <div className="sec">
                <div className="inbx">
                    <div className="sec_title">
                        <h2>Kakao Pay</h2>
                    </div>

                    <div className="sec_content ver_item">
                        <div className="fllft">
                            <div className={`today_price ${color}`}>
                                {biddingInfo.currentTradeData ? biddingInfo.currentTradeData : '-'}
                            </div>
                            <div className="ex_price">
                                <span className="letter">전일대비</span>
                                <span className={`num ${color}`}>
                                    {`${ratio}%`}
                                    <span className={`triangle ${arrow}`} />
                                    {biddingInfo.currentTradeData ?
                                        biddingInfo.currentTradeData - biddingInfo.startPrice : ''}
                                </span>
                            </div>
                        </div>
                        <div className="flrgt">
                            <dl>
                                <dt>고가</dt>
                                <dd className="color_red">{biddingInfo.maxPrice}</dd>
                                <dt>저가</dt>
                                <dd className="color_blue">{biddingInfo.minPrice}</dd>
                            </dl>
                            <dl>
                                <dt>거래량</dt>
                                <dd>{numberWithCommas(biddingInfo.totalTrade)}</dd>
                                <dt>거래대금</dt>
                                <dd>{numberWithCommas(biddingInfo.sumTradePrice)}<span className="mark">원</span></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Information.propTypes = {
    /**
     * 거래정보
     */
    biddingInfo: PropTypes.object,
};

export default Information;
