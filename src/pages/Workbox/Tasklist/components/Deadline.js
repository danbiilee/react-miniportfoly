import React from 'react';
import styled, { css } from 'styled-components';
import { today, strToDate } from '../../../../utils/utils';

const DeadlineWrapper = styled.div`
  margin: 10px 0 15px;
  padding-left: 3px;
  color: ${props => props.theme.layout.mainColor};
  ${props =>
    props.isOver &&
    css`
      color: ${props => props.theme.component.priority};
    `};
  ${props =>
    props.isFin &&
    css`
      color: ${props => props.theme.layout.outer};
    `};
  font-size: 0.7rem;
  font-weight: bold;
`;

/*
  1. 시작일만 있는 경우: ~에 시작
  2. 마감일만 있는 경우
    a. 마감일 안 지난 경우: ~에 마감
    b. 마감일 지난 경우: 마감일 ~일 지남
  3. 둘 다 있는 경우
    a. 마감일 안 지난 경우: 시작일 - 마감일
    b. 마감일 지난 경우: 마감일 ~일 지남
  4. 완료된 경우: ~에 완료
*/
const handleDeadline = (startDt, endDt, finDt) => {
  const start =
    startDt && `${startDt.substring(5, 7)}월${startDt.substring(8)}일`;
  const end = endDt && `${endDt.substring(5, 7)}월${endDt.substring(8)}일`;
  const fin = finDt && `${finDt.substring(5, 7)}월${finDt.substring(8)}일`;
  let result = '';

  if (fin) {
    return `${fin}에 완료`;
  }
  if (end && today > endDt) {
    const diff = (strToDate(today) - strToDate(endDt)) / (1000 * 60 * 60 * 24);
    return `마감일 ${diff}일 지남`;
  }

  if (start && !end) {
    result = `${start}에 시작`;
  } else if (!start && end) {
    result = `${end}에 마감`;
  } else {
    result = `${start} - ${end}`;
  }
  return result;
};

const Deadline = ({ startDt, endDt, finDt }) => {
  const isOver = endDt && today > endDt ? true : false; // 기한 지남 여부
  const isFin = finDt ? true : false; // 완료 여부
  return (
    <DeadlineWrapper isOver={isOver} isFin={isFin}>
      {handleDeadline(startDt, endDt, finDt)}
    </DeadlineWrapper>
  );
};

export default Deadline;
