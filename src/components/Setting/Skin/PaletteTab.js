import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { getRandomHexColor } from '../../../utils/utils';

const Wrapper = styled.ul``;

const Tab = styled.li`
  width: 25px;
  height: 20px;
  border: 1px solid #a5a5a5;
  ${props =>
    props.isActive &&
    css`
      border-right-color: ${props => props.color};
    `}
  border-radius: 5px 0 0 5px;
  background: ${props => props.color};
  cursor: pointer;
`;

const PaletteTab = ({ target, setTarget, setHexColor }) => {
  const { palette } = useSelector(state => state);

  // 탭 리스트
  const tabList = [];
  let index = 1;
  for (let key in palette) {
    tabList.push({ id: index++, target: key, color: palette[key].color });
  }

  // 탭 클릭할 때마다 스와치 컬러 랜덤적용
  const onClick = target => {
    setTarget(target);
    setHexColor(getRandomHexColor());
  };

  return (
    <Wrapper>
      {tabList.map(tab => (
        <Tab
          key={tab.id}
          color={tab.color}
          isActive={tab.target === target}
          onClick={() => onClick(tab.target)}
        />
      ))}
    </Wrapper>
  );
};

export default React.memo(PaletteTab);
