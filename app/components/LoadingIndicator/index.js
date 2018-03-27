import React from 'react';

const LoadingIndicator = () => (
    <div style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-37px', marginLeft: '-35px' }}>
        <div className="LS_loader">
            <div className="loader_bx">
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
            </div>
            <p className="loader_txt">Loading...</p>
        </div>
    </div>
);

export default LoadingIndicator;
