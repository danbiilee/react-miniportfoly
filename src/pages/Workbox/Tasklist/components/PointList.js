import React from 'react';
import styled from 'styled-components';
import Point from './Point';

const Wrapper = styled.div`
  position: relative;
  svg {
    margin-right: 5px;
    font-size: 1.2rem;
  }
  .btn {
    cursor: pointer;
    &:hover {
      color: #656a70;
      cursor: pointer;
    }
  }
`;

const ListWrapper = styled.ul`
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 10;
  display: ${props => (props.activePoint ? 'block' : 'none')};
  width: 120px;
  height: 120px;
  overflow-y: auto;
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;

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

const PointList = ({ point, handlePoint, activePoint, onToggle }) => {
  const renderPoints = () => {
    const count = 5;
    let renderList = [];

    for (let i = 0; i <= count; i++) {
      let spanList = [];

      for (let j = 1; j <= count; j++) {
        if (!i) {
          // if span is all empty
          spanList.push(<span key={`${i}-${j}`}></span>);
        } else if (i === count) {
          // if span is all full
          spanList.push(<span key={`${i}-${j}`} className="isFull"></span>);
        } else {
          if (i >= j) {
            spanList.push(<span key={`${i}-${j}`} className="isFull"></span>);
          } else {
            spanList.push(<span key={`${i}-${j}`}></span>);
          }
        }
      }
      renderList.push(
        <li key={i} value={i} onClick={() => handlePoint(i)} role="button">
          <PointWrapper>{spanList}</PointWrapper>
        </li>,
      );
    }

    return renderList;
  };
  const options = renderPoints();

  return (
    <Wrapper>
      <div>
        <Point point={point} />
        <button type="button" onClick={() => onToggle('point')}>
          >
        </button>
      </div>
      <ListWrapper activePoint={activePoint}>
        {options && options.map(option => option)}
      </ListWrapper>
    </Wrapper>
  );
};

export default PointList;
