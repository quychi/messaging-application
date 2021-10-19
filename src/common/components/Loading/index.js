/**
 *
 * Loading
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Circle from './Circle';
import Wrapper from './Wrapper';

function Loading() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(242, 242, 242, 0.3)',
        zIndex: 10000,
      }}
    >
      <Wrapper>
        {/* <img src={logo} alt="loading" style={{ margin: '25% 25%', width: '50%', height: '50%' }} /> */}
        <Circle />
        <Circle rotate={30} delay={-1.1} />
        <Circle rotate={60} delay={-1} />
        <Circle rotate={90} delay={-0.9} />
        <Circle rotate={120} delay={-0.8} />
        <Circle rotate={150} delay={-0.7} />
        <Circle rotate={180} delay={-0.6} />
        <Circle rotate={210} delay={-0.5} />
        <Circle rotate={240} delay={-0.4} />
        <Circle rotate={270} delay={-0.3} />
        <Circle rotate={300} delay={-0.2} />
        <Circle rotate={330} delay={-0.1} />
      </Wrapper>
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
