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
    makeSelectData,
} from './selectors';

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
        console.log(this.props.data);
        return (
            <div className="container">
                <Helmet>
                    <title>Stock</title>
                </Helmet>
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
     * 주식데이터 입니다.
     */
    data: ImmutablePropTypes.list,
    /**
     * 새로운 데이터를 추가하는 액션입니다.
     */
    onAddNewData: PropTypes.func,
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
    data: makeSelectData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'main', reducer });

export default compose(
    withReducer,
    withConnect,
)(MainPage);
