import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { setColor } from '../../module/palette';
import Post from '../../components/Layout/Post';

const ThemeWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
`;

const TabList = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  display: block;
  width: 80px;
  height: 50px;
  border: 1px solid;
  background: ${props => props.bg};
  cursor: pointer;
`;

const ChangeWrapper = styled.div`
  border: 1px solid pink;
  
`;

const ColorWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const Color = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-of-type {
    margin-left: 20px;
    p {
      margin-bottom: 11px;
    }
  }
  p {
    &:first-of-type {
      font-weight: bold;
      font-size: 1.5rem;
    }
    &:last-of-type {
      margin-top: 5px;
    }  
  }
  div {
    width: 80px;
    height: 80px;
    margin-top: 15px;
    background: ${props => props.color};
    border: 1px solid;
  }
  input {
    width: 85px;
    height: 88px;
    border: 0;
    margin: 0;
    padding: 0;
    background: none;
    cursor: pointer;
  }
`;

const Button = styled.button`
  height: 35px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid;
  line-height: 35px;
  font-weight: bold;
  font-size: .9rem;
  outline: 0;
  cursor: pointer;
`;

const ChangeTheme = () => {
  // Redux
  const dispatch = useDispatch();
  const { layout: palette } = useSelector(state => state.palette);
  const { layout } = useSelector(state => state);

  // Get TabMenu List 
  const tabList = [];
  let index = 1;
  for (let key in palette) {
    tabList.push({ id: index++, target: key, color: palette[key]});
  }

  // Selected layout & hexColor
  const [target, setTarget] = useState('');
  const [hexColor, setHexColor] = useState('');

  // Hex Color Code
  const getRandomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += letters[Math.floor(Math.random() * 16)];
    }
    return hex;
  };
  const handleHexColor = e => setHexColor(e.target.value);

  // Handle Color
  const handleLayoutColor = target => {
    // Active layout DOM 
    // const key = target.includes('1') ? 'layout1' : target.includes('2') ? 'layout2' : 'card';
    // console.log(layout.layout1.style.background);

    // Q. how to detect new hexCode after setHexColor????
    const newHexColor = getRandomHexColor();
    setTarget(target);
    setHexColor(newHexColor);
  };

  const changeLayoutColor = () => {
    dispatch(setColor(target, hexColor));
  };

  return (
    <Post>
      <h3>테마 변경하기</h3>
      <ThemeWrapper>
        <TabList>
          {
            tabList.map(tab => (<Tab key={tab.id} bg={tab.color} zIndex={tabList.length - tab.id} onClick={() => handleLayoutColor(tab.target)}></Tab>))
          }
        </TabList>
        <ChangeWrapper>
          <ColorWrapper>
            <Color color={palette[target]}>
              <p>BEFORE</p>
              <div></div>
              <p>{palette[target]}</p>
            </Color>
            <Color color={hexColor}>
              <p>AFTER</p>
              <input
                type="color"
                name={target}
                value={hexColor}
                onChange={handleHexColor}
              />
              <p>{hexColor}</p>
            </Color>
          </ColorWrapper>
          <Button type="button" onClick={() => setHexColor(getRandomHexColor())}>
            RANDOM!
          </Button>
          <Button type="button" onClick={changeLayoutColor}>
            적용하기
          </Button>
          <Button type="button">
            되돌리기
          </Button>
        </ChangeWrapper>
      </ThemeWrapper>
    </Post>
  );
};

export default ChangeTheme;
