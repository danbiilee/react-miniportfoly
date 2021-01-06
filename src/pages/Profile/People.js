import React from 'react';
import styled from 'styled-components';
import { publicUrl } from '../../utils/utils';

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

const People = () => {
  return (
    <Wrapper>
      <img src={publicUrl + '/resources/img/assa.jfif'} alt="assa" />
      <p>By::sorewa_melon</p>
    </Wrapper>
  );
};

export default People;
