import React from 'react';
import styled from 'styled-components';
import MainMenu from '../Menu/MainMenu';

const ContentWrapper = styled.div`
  position: absolute;
  top: 19px;
  right: -67px;
  width: 79%;
  height: 93%;
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

const Content = ({ children }) => {
  return (
    <ContentWrapper>
      <h1>귀엽고 깜찍한 미니포트폴리</h1>
      <ContentBlock>
        {children}
        <MainMenu />
      </ContentBlock>
    </ContentWrapper>
  );
};

export default Content;
