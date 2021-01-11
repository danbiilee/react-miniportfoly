import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 50px;
  border: 20px double #d7d3d3;
  img {
    width: 150px;
  }
  p {
    color: #ccc;
    font-size: 0.9rem;
  }
`;

const Favorite = () => {
  return (
    <Wrapper>
      <p>내 즐겨찾기가 없습니다.</p>
    </Wrapper>
  );
};

export default Favorite;
