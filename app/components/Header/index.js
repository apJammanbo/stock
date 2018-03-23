import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import styled from 'styled-components';

/**
 * Page Root 에 대한 스타일을 지정한다.
 */
const HeaderWrapper = styled.header`
  height: 70px; 
  background: #191919;
`;

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <HeaderWrapper>
            </HeaderWrapper>
        );
    }
}

export default Header;
