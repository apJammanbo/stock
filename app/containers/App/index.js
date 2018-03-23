/**
 *
 * App
 *
 * 프로그램의 진입점입니다.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
// import { Switch, Route } from 'react-router-dom';
//
// import HomePage from 'containers/HomePage/Loadable';
// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
// import Footer from 'components/Footer';

/**
 * Page Root 에 대한 스타일을 지정한다.
 */
const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;


export default function App() {
    return (
        <AppWrapper>
            <Helmet
                titleTemplate="%s - 타이틀입니다."
                defaultTitle="타이틀입니다."
            >
                <meta name="description" content="A React.js Boilerplate application" />
            </Helmet>
            <Header />
            {/*<Switch>*/}
                {/*<Route exact path="/" component={HomePage} />*/}
                {/*<Route path="/features" component={FeaturePage} />*/}
                {/*<Route path="" component={NotFoundPage} />*/}
            {/*</Switch>*/}
            {/*<Footer />*/}
        </AppWrapper>
    );
}
