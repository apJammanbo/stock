/*
 * NotFoundPage
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import '!file-loader?name=[name].[ext]!../../images/404.png';

export default function NotFound() {
    return (
        <div className="container">
            <Helmet>
                <title>페이지가 없습니다.</title>
            </Helmet>
            <div className="content">
                <img style={{ width: '100%' }} src="404.png" alt={'페이지가 없습니다.'} />
            </div>
        </div>
    );
}
