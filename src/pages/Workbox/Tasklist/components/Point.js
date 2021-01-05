import React from 'react';
import styled from 'styled-components';

const PointWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    width: 7px;
    height: 7px;
    margin-left: 2px;
    border: 1px solid ${props => props.theme.layoutBg2.color};
    border-radius: 7px;
    &.isFull {
      border: 0;
      background: ${props => props.theme.mainColor.color};
    }
  }
`;

const renderSpan = point => {
  const spanList = [];
  if (point) {
    for (let i = 0; i < 5; i++) {
      if (i < point) spanList.push(<span key={i} className="isFull"></span>);
      else spanList.push(<span key={i}></span>);
    }
    return spanList;
  } else return null;
};

const Point = ({ point }) => {
  const spanList = renderSpan(point);
  return <PointWrapper>{spanList && spanList.map(item => item)}</PointWrapper>;
};

export default Point;
