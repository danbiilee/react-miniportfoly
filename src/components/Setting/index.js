import React from 'react';
import styled from 'styled-components';
import ChangeSkin from './ChangeSkin';

const Wrapper = styled.div`
  width: 20%;
  font-size: 0.9rem;
`;

const Setting = () => {
  return (
    <Wrapper>
      <div>플레이리스트</div>
      <ChangeSkin />
    </Wrapper>
  );
};

export default Setting;
