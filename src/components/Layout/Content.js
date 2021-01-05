import React from 'react';
import styled from 'styled-components';
import MainMenu from '../Menu/MainMenu';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  h1 {
    color: ${props => props.theme.headerColor.color};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Content = ({ children }) => {
  return (
    <ContentWrapper>
      <h1>danbi::miniportfoly</h1>
      {children}
      <MainMenu />
    </ContentWrapper>
  );
};

export default Content;
