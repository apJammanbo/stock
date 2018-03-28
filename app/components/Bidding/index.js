/*
 * Bidding 호가창입니다.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BiddingHeader from './BiddingHeader';
import BiddingFooter from './BiddingFooter';
import BiddingInformation from './BiddingInformation';
import TradeInformation from './TradeInformation';

class Bidding extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor() {
        super();
        this.state = {
            showCount: 5,
        };
    }

    /**
     * 보여주는 호가창 갯수를 토글한다.
     */
    handleToggleShowCount = () => {
        if (this.state.showCount === 5) {
            this.setState({ showCount: 7 });
        } else {
            this.setState({ showCount: 5 });
        }
    }

    /**
     * 매도 tr 생성
     */
    createSellTrs = (showCount, sellData, biddingInfo, maxSellQuantity) => {
        const sellTrs = [];
        for (let i = 0; i < showCount; i += 1) {
            const data = sellData.get(showCount - i - 1);

            let priceClass = 'price';
            let perClass = 'per';
            let price = '-';
            if (data) {
                price = data.get('price');
                if (biddingInfo.startPrice > price) {
                    priceClass = 'price color_blue';
                    perClass = 'per color_blue';
                }
            } else {
                priceClass = 'price color_white';
            }

            let tdPriceClass = '';
            if (data) {
                if (data.get('price') === biddingInfo.startPrice) {
                    tdPriceClass += ' start_price';
                }
                if (data.get('price') === biddingInfo.currentTradeData) {
                    tdPriceClass += ' active';
                }
            }

            sellTrs.push(
                <tr
                    key={i}
                    className="sell"
                >
                    <td className="celrgt">
                        {data ? data.get('quantity') : ''}
                        {data && maxSellQuantity ?
                            <div
                                className="bar"
                                style={{ width: `${((data.get('quantity') / maxSellQuantity) * 100)}%` }}
                            />
                            : null
                        }
                    </td>
                    <td className={tdPriceClass}>
                        <div className={priceClass}>{price}</div>
                        <div className={perClass}>{data ? `${data.get('ratio')}%` : ''}</div>
                    </td>
                    {i === 0 ?
                        <td className="celvab stock_info" rowSpan={showCount} style={{ padding: '10px 10px 2px' }}>
                            <BiddingInformation
                                biddingInfo={biddingInfo}
                            />
                        </td> : null
                    }
                </tr>
            );
        }
        return sellTrs;
    }

    /**
     * 매수 tr 생성
     */
    createBuyTrs = (showCount, buyData, biddingInfo, maxBuyQuantity, tradedData) => {
        const buyTrs = [];
        for (let i = 0; i < showCount; i += 1) {
            const data = buyData.get(i);

            let priceClass = 'price';
            let perClass = 'per';
            let price = '-';
            if (data) {
                price = data.get('price');
                if (biddingInfo.startPrice < price) {
                    priceClass = 'price color_red';
                    perClass = 'per color_red';
                }
            } else {
                priceClass = 'price color_white';
            }

            let tdPriceClass = ' ';
            if (data) {
                if (data.get('price') === biddingInfo.startPrice) {
                    tdPriceClass += 'start_price ';
                }
                if (data.get('price') === biddingInfo.currentTradeData) {
                    tdPriceClass += 'active';
                }
            }

            buyTrs.push(
                <tr
                    key={i}
                    className="purchase"
                >
                    {i === 0 ?
                        <TradeInformation
                            tradedData={tradedData}
                        /> : null
                    }
                    <td className={tdPriceClass}>
                        <div className={priceClass}>{price}</div>
                        <div className={perClass}>{data ? `${data.get('ratio')}%` : ''}</div>
                    </td>
                    <td className="cellft">
                        { data ? data.get('quantity') : '' }
                        { data && maxBuyQuantity ?
                            <div
                                className="bar"
                                style={{ width: `${(data.get('quantity') / maxBuyQuantity) * 100}%` }}
                            />
                            : null
                        }

                    </td>
                </tr>
            );
        }
        return buyTrs;
    }
    /**
     * render
     */
    render() {
        const {
            buyData,
            sellData,
            tradedData,
            biddingInfo,
        } = this.props;

        const {
            showCount,
        } = this.state;

        let maxBuyQuantity = 0;
        buyData.forEach((item) => {
            maxBuyQuantity = Math.max(maxBuyQuantity, item.get('quantity'));
        });

        let maxSellQuantity = 0;
        sellData.forEach((item) => {
            maxSellQuantity = Math.max(maxSellQuantity, item.get('quantity'));
        });

        const sellTrs = this.createSellTrs(showCount, sellData, biddingInfo, maxSellQuantity);
        const buyTrs = this.createBuyTrs(showCount, buyData, biddingInfo, maxBuyQuantity, tradedData);

        return (
            <div className="sec">
                <div className="inbx">
                    <BiddingHeader
                        showCount={showCount}
                        onToggleShowCount={this.handleToggleShowCount}
                        biddingInfo={biddingInfo}
                    />
                    <div className="sec_content pd0">
                        <div className="scrollable-y">

                            <table className="tbl_quotes">
                                <caption>
                                    <span className="blind">호가 테이블</span>
                                </caption>
                                <colgroup>
                                    <col style={{ width: '33%' }} />
                                    <col style={{ width: '34%' }} />
                                    <col style={{ width: '33%' }} />
                                </colgroup>
                                <tbody>

                                {sellTrs}
                                {buyTrs}
                                </tbody>
                            </table>
                        </div>
                        <BiddingFooter
                            buyData={buyData}
                            sellData={sellData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Bidding.propTypes = {
    /**
     * 매수 데이터(B)
     */
    buyData: ImmutablePropTypes.list,
    /**
     * 매도 데이터(S)
     */
    sellData: ImmutablePropTypes.list,
    /**
     * 거래데이터
     */
    tradedData: ImmutablePropTypes.list,
    /**
     * 거래정보
     */
    biddingInfo: PropTypes.object,
};

export default Bidding;
