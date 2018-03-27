/*
 * MainPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { StockApi } from '../../api/index';

import {
    addDataIndex,
    addNewData,
} from './actions';
import {
    makeSelectDataIndex,
    makeSelectBuyData,
    makeSelectSellData,
    makeSelectStartPrice,
    makeSelectTradedData,
} from './selectors';

// 컴포넌트 로드
import Information from '../../components/Information';
import Bidding from '../../components/Bidding';
import Chart from '../../components/Chart';


export class MainPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    /**
     * componentDidMount
     */
    componentDidMount() {
        // 1초에 한번씩 데이터를 받아온다.
        setInterval(this.handleGetNewData, 1000);
    }

    /**
     * 새로운 데이터를 받아와서 저장합니다.
     */
    handleGetNewData = () => {
        StockApi.getNewData(this.props.dataIndex)
            .then((data) => this.props.onAddNewData(data));
    }


    /**
     * render
     */
    render() {
        const {
            buyData,
            sellData,
            startPrice,
            tradedData,
        } = this.props;

        // 거래데이터
        const biddingInfo = {
            startPrice,
            totalTrade: 0,
            sumTradePrice: 0,
            maxPrice: 0,
            minPrice: 0,
        };

        // 현재가
        biddingInfo.currentTradeData = tradedData.size > 0 ? tradedData.getIn([tradedData.size - 1, 'price']) : null;

        tradedData.forEach((item, index) => {
            if (index === 0) {
                biddingInfo.minPrice = item.get('price');
            }
            biddingInfo.totalTrade += item.get('quantity');
            biddingInfo.sumTradePrice += (item.get('price') * item.get('quantity'));
            biddingInfo.maxPrice = Math.max(biddingInfo.maxPrice, item.get('price'));
            biddingInfo.minPrice = Math.min(biddingInfo.minPrice, item.get('price'));
        });

        return (
            <div className="container">
                <Helmet>
                    <title>Stock</title>
                </Helmet>
                <div className="content">
                    <Information
                        biddingInfo={biddingInfo}
                    />
                    <Bidding
                        biddingInfo={biddingInfo}
                        buyData={buyData}
                        sellData={sellData}
                        tradedData={tradedData}
                    />
                    <Chart />
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {
    /**
     * 다음번에 가지고 와야할 데이터 인덱스 입니다.
     */
    dataIndex: PropTypes.number.isRequired,
    /**
     * 매수 데이터(B)
     */
    buyData: ImmutablePropTypes.list,
    /**
     * 매도 데이터(S)
     */
    sellData: ImmutablePropTypes.list,
    /**
     * 새로운 데이터를 추가하는 액션입니다.
     */
    onAddNewData: PropTypes.func,
    /**
     * 시작가
     */
    startPrice: PropTypes.number,
    /**
     * 거래 성사 데이터
     */
    tradedData: ImmutablePropTypes.list,
};

export function mapDispatchToProps(dispatch) {
    return {
        onAddDataIndex: () => dispatch(addDataIndex()),
        // 새로운 데이터를 가지고 올 때 발생하는 콜백
        onAddNewData: (data) => dispatch(addNewData(data)),
    };
}

const mapStateToProps = createStructuredSelector({
    dataIndex: makeSelectDataIndex(),
    buyData: makeSelectBuyData(),
    sellData: makeSelectSellData(),
    startPrice: makeSelectStartPrice(),
    tradedData: makeSelectTradedData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'main', reducer });

export default compose(
    withReducer,
    withConnect,
)(MainPage);
