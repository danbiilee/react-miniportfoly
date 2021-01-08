import React from 'react';
import styled from 'styled-components';
import ChangeSkin from './Skin';
import MusicPlayer from './Music';

const Wrapper = styled.div`
  width: 20%;
  font-size: 0.9rem;
  & > div {
    padding: 10px;
    border-radius: 5px;
  }
`;

const Setting = () => {
  return (
    <Wrapper>
      <MusicPlayer />
      <ChangeSkin />
    </Wrapper>
  );
};

export default React.memo(Setting);
