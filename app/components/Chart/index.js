/*
 * Chart
 */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


class Chart extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const {
            tradedData,
        } = this.props;


        return (
            <div className="sec">
                <div className="inbx">
                    <div className="sec_title">
                        <h2>챠트</h2>
                    </div>
                    <div className="sec_content chart_bx">
                        <ResponsiveContainer height={120}>
                            <LineChart
                                data={tradedData.toJS()}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[540, 610]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="price" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>

                        <ResponsiveContainer height={110}>
                            <BarChart
                                data={tradedData.toJS()}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 250]} />
                                <Tooltip />
                                <Bar dataKey="quantity" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}

Chart.propTypes = {
    /**
     * 거래데이터
     */
    tradedData: ImmutablePropTypes.list,
};

export default Chart;
