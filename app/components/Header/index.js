/*
 * Header WebPage Header 입니다.
 */
import React from 'react';
import '!file-loader?name=[name].[ext]!../../images/logo.png';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <header>
                <div className="content">
                    <h1>
                        {/*<a href="/" className="logo"><img src="logo.png" alt="카카오페이" /></a>*/}
                    </h1>
                    <div className="popover_bx">
                        <button type="button" className="hamberger">
                            <span className="blind">메뉴버튼</span>
                            <svg focusable="false" viewBox="0 0 24 24">
                                <rect width={24} height="4.8" />
                                <rect y="9.601" width={24} height="4.8" />
                                <rect y="19.201" width={24} height="4.8" />
                            </svg>
                        </button>
                        <div className="result_bx">
                            <ul>
                                <li><button type="button">sample1</button></li>
                                <li><button type="button">sample2</button></li>
                                <li><button type="button">sample3</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
