import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 7px 10px 7px 0;
  background: #f7f7f7;
  /* border-top: 3px solid #ebebeb; */
  color: gray;
  font-size: 0.75rem;
  text-align: right;
  text-decoration: underline;
  &:hover {
    color: #333;
    cursor: pointer;
  }
`;

const Bottom = ({ cnt, onToggle }) => {
  return <Wrapper onClick={onToggle}>완료된 업무 {cnt}개 보기</Wrapper>;
};

export default Bottom;
