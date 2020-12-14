import React from 'react';
import styled from 'styled-components';

const ContentBlock = styled.div`
  z-index: 10;
  width: 68%;
  h1 {
    color: ${props => props.theme.layout.headerColor};
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const Content = ({ children }) => {
  return (
    <ContentBlock>
      <h1>귀엽고 깜찍한 미니포트폴리</h1>
      {children}
    </ContentBlock>
  );
};

export default Content;
