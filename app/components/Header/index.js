import React from 'react';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <header>
                <div className="content">
                    <h1>Kakao Pay Stock</h1>
                    <button type="button" className="hamberger">
                        <span className="blind">메뉴버튼</span>
                        <svg focusable="false" viewBox="0 0 24 24">
                            <rect width="24" height="4.8"></rect>
                            <rect y="9.601" width="24" height="4.8"></rect>
                            <rect y="19.201" width="24" height="4.8"></rect>
                        </svg>
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;
