import React from 'react';
import styled from 'styled-components';
import MainMenu from '../Menu/MainMenu';

const ContentWrapper = styled.div`
  position: absolute;
  top: 19px;
  right: -67px;
  width: 79%;
  height: 95.3%;
  h1 {
    color: ${props => props.theme.layout.headerColor};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const ContentBlock = styled.div`
  z-index: 10;
  display: flex;
  height: 100%;
`;

const RingWrapper = styled.div`
  z-index: 100;
  position: absolute;
  top: 50px;
  left: -22px;
  .hole {
    width: 6px;
    height: 6px;
    border: 1px solid #a5a5a5;
    border-radius: 10px;
    &.outer {
      position: relative;
      width: 12px;
      height: 12px;
    }
    &.inner {
      position: absolute;
      top: 2px;
      left: 2px;
    }
  }
`;

const Content = ({ children }) => {
  return (
    <ContentWrapper>
      <h1>귀엽고 깜찍한 미니포트폴리</h1>
      <RingWrapper>
        <ul>
          <li>
            <div className="hole outer l"><div className="hole inner"></div></div>
            {/* <div className="hole r"></div>
            <div className="ring"></div> */}
          </li>
        </ul>
      </RingWrapper>
      <ContentBlock>
        {children}
        <MainMenu />
      </ContentBlock>
    </ContentWrapper>
  );
};

export default Content;
