import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 20px;
`;

const BorderWrapper = styled.div`
  width: 75%;
  height: 95vh;
  padding: 25px;
  background: ${props => props.theme.layout.layoutBg1};
  border: 1px solid ${props => props.theme.layout.layoutBorder1};
  border-radius: 10px;
`;

const BgWrapper = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  height: 100%;
  padding: 20px 8px 8px;
  background: ${props => props.theme.layout.layoutBg2};
  border: 2px dashed ${props => props.theme.layout.layoutBorder2};
  border-radius: 10px;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <BorderWrapper>
        <BgWrapper>{children}</BgWrapper>
      </BorderWrapper>
    </Wrapper>
  );
};

export default Layout;
