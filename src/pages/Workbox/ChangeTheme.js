import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import { setColor } from '../../module/palette';
import Post from '../../components/Layout/Post';

const ThemeWrapper = styled.div`
  width: 95%;
  height: 100%;
  margin: 40px auto;
`;

const TabList = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  display: block;
  width: 80px;
  height: 50px;
  &:not(:first-of-type) {
    margin-left: -1px;
  }
  border: 1px solid #a5a5a5;
  border-radius: 5px 5px 0 0;
  background: ${props => props.color};
  cursor: pointer;
`;

const ChangeWrapper = styled.div`
  margin-top: -1px;
  border: 1px solid #a5a5a5;  
  border-radius: 0 5px 5px 5px;
  background: ${props => props.color};
`;

const ColorWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const Swatch = styled.div`
  width: 150px;
  height: 200px;
  background: #fff;
  input {
    display: flex;
    width: 140px;
    height: 140px;
    margin: 0 auto;
    padding: 0;
    border: 0;
    background: none;
    outline: none;
    cursor: pointer;
  }
  p {
    margin-left: 15px;
    &:first-of-type {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
`;

const PaletteWrapper = styled.div`
  width: 60%;
  height: fit-content;
  padding: 20px;
  margin-left: 20px;
  background: #fff;
`;

const ColorList = styled.ul`
  display: flex;  
  margin-bottom: 5px;
`;

const Color = styled.li`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  background: ${props => props.color};
  border-radius: 5px;
  cursor: pointer;
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

  // Set tabMenu list 
  const tabList = [];
  let index = 1;
  for (let key in palette) {
    tabList.push({ id: index++, target: key, color: palette[key]});
  }

  // Set default Palette's colors
  const defaultColors = [
    '#e03131', '#d6336c', '#e8590c', '#f59f00', '#2f9e44', '#1098ad', '#1971c2', '#6741d9',
  ];
  const humidColors = [
    '#ff6b6b', '#faa2c1', '#ffa94d', '#ffe066', '#8ce99a', '#99e9f2', '#74c0fc', '#b197fc',
  ];

  // Selected layout & hexColor
  const [target, setTarget] = useState('');
  const [hexColor, setHexColor] = useState('');

  // Hex color code
  const getRandomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += letters[Math.floor(Math.random() * 16)];
    }
    return hex;
  };
  const handleHexColor = e => setHexColor(e.target.value);

  // Handle color
  const handleLayoutColor = target => {
    // Q. how to detect new hexCode after setHexColor????
    const newHexColor = getRandomHexColor();
    setTarget(target);
    setHexColor(newHexColor);
  };

  const changeLayoutColor = () => {
    dispatch(setColor({
      key: target,
      value: hexColor
    }));
  };

  return (
    <Post>
      <h3>테마 변경하기</h3>
      <ThemeWrapper>
        <TabList>
          {
            tabList.map(tab => (<Tab key={tab.id} color={tab.color} onClick={() => handleLayoutColor(tab.target)}></Tab>))
          }
        </TabList>
        <ChangeWrapper color={palette[target]}>
          <ColorWrapper>
            <Swatch color={hexColor}>
              <input
                type="color"
                name={target}
                value={hexColor}
                onChange={handleHexColor}
              />
              <p>{hexColor}</p>
              <p>{target}</p>
            </Swatch>
            <PaletteWrapper>
              <ColorList>
              {
                defaultColors.map(color => (<Color key={index} color={color}></Color>))
              }
              </ColorList>
              <ColorList>
              {
                humidColors.map(color => (<Color key={index} color={color}></Color>))
              }
              </ColorList>
              <Button type="button" onClick={() => setHexColor(getRandomHexColor())}>
                랜덤!
              </Button>
              <Button type="button" onClick={changeLayoutColor}>
                적용하기
              </Button>
            </PaletteWrapper>
          </ColorWrapper>
        </ChangeWrapper>
      </ThemeWrapper>
    </Post>
  );
};

export default ChangeTheme;
