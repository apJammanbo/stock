/*
 * Bidding Header 호가창 헤더
 */

import React from 'react';
import PropTypes from 'prop-types';

class BiddingHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const {
            showCount,
            onToggleShowCount,
        } = this.props;
        return (
            <div className="sec_title">
                <h2>일반호가</h2>
                <button
                    onClick={onToggleShowCount}
                    type="button"
                    className="btn_quotes"
                >
                    {showCount === 7 ? '5호가' : '7호가'}
                </button>
            </div>
        );
    }
}

BiddingHeader.propTypes = {
    /**
     * 보여주는 갯수
     */
    showCount: PropTypes.number.isRequired,
    /**
     *
     */
    onToggleShowCount: PropTypes.func.isRequired,
};

export default BiddingHeader;
