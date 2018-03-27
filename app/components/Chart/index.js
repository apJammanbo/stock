/*
 * Chart
 */

import React from 'react';
import '!file-loader?name=[name].[ext]!../../images/chart.png';

class Chart extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="sec">
                <div className="inbx">
                    <div className="sec_title">
                        <h2>챠트</h2>
                        <button type="button" className="btn_graph open"><span className="blind">챠트 열기/닫기</span></button>
                    </div>
                    <div className="sec_content chart_bx">
                        <img src="chart.png" width="100%" alt="chart" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chart;
