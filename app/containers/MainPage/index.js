/*
 * MainPage
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import { addDataIndex } from './actions';
import { makeSelectDataIndex } from './selectors';

export class MainPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    /**
     * componentDidMount
     */
    componentDidMount() {
        // 1초에 한번씩 데이터를 받아온다.

    }

    /**
     * render
     */
    render() {
        const {
            test,
            onChangeTest,
        } = this.props;

        return (
            <div>
                <Helmet>
                    <title>Stock</title>
                </Helmet>

                {test}
                <button onClick={onChangeTest}>Test Button</button>
            </div>
        );
    }
}

MainPage.propTypes = {
    /**
     * 테스트 정수 입니다.
     */
    test: PropTypes.number,
    /**
     * Change Test 함수 함수입니다.
     */
    onChangeTest: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        onAddDataIndex: () => dispatch(addDataIndex()),
    };
}

const mapStateToProps = createStructuredSelector({
    dataIndex: makeSelectDataIndex(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'main', reducer });

export default compose(
    withReducer,
    withConnect,
)(MainPage);
