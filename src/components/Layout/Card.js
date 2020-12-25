import React from 'react';
import styled from 'styled-components';

const CardBlock = styled.div`
  z-index: 10;
  overflow-y: auto;
  width: 100%;
  height: 96%;
  margin-top: 10px;
  padding: 20px;
  border: 1px solid ${props => props.theme.layout.cardBorder};
  border-radius: 10px;
  background: ${props => props.theme.layout.cardBg};
  section {
    width: 100%;
    height: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = ({ children }) => {
  return <CardBlock>{children}</CardBlock>;
};

export default Card;
