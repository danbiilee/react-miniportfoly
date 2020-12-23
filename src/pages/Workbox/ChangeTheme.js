import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { setColor } from '../../module/palette';
import Post from '../../components/Layout/Post';

const ThemeWrapper = styled.div`
  position: relative;
  width: 95%;
  height: 100%;
  margin: 40px auto;
  padding-top: 50px;
`;

const TabList = styled.ul`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
`;

const TabBox = styled.li`
  position: absolute;
  top: 1px;
  left: ${props => props.left}px;
  display: block;
  width: 50px;
  height: 50px;
  border: 1px solid #a5a5a5;
  ${props =>
    props.isActive &&
    css`
      border-bottom-color: ${props => props.color};
    `}
  border-radius: 5px 5px 0 0;
  background: ${props => props.color};
  cursor: pointer;
  &:hover {
    top: -20px;
    height: 71px;
  }
`;

const ChangeWrapper = styled.div`
  min-width: 710px;
  border: 1px solid #a5a5a5;
  border-radius: 0 5px 5px 5px;
  background: ${props => props.color};
  box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
  .pleasePick {
    padding: 20px;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
    font-weight: bold;
  }
`;

const ColorWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const SwatchBox = styled.div`
  width: 150px;
  height: 200px;
  background: #fff;
  border: 1px solid #a5a5a5;
  border-radius: 3px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
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
  position: relative;
  min-height: 200px;
  min-width: 500px;
  width: 60%;
  height: fit-content;
  padding: 20px;
  margin-left: 20px;
  background: #fff;
  border: 1px solid #a5a5a5;
  border-radius: 3px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
`;

const ColorList = styled.ul`
  display: flex;
  &:first-of-type {
    margin-bottom: 8px;
  }
  &:last-of-type {
    margin-bottom: 15px;
  }
`;

const Color = styled.li`
  width: 50px;
  height: 50px;
  &:not(:last-of-type) {
    margin-right: 8px;
  }
  background: ${props => props.color};
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  height: 35px;
  margin-right: 8px;
  padding: 0 20px;
  border-radius: 20px;
  border: 2px solid;
  background: #fff;
  line-height: 35px;
  font-weight: bold;
  font-size: 0.9rem;
  outline: 0;
  cursor: pointer;
  &:hover {
    background: #333;
    color: #fff;
  }
`;

const ChangeTheme = () => {
  const { layout: palette } = useSelector(state => state.palette);
  //console.log('root rendeer');

  // 탭 리스트 
  const tabList = [];
  let index = 1;
  let left = 0; // + tab's width, margin-left
  for (let key in palette) {
    tabList.push({ id: index++, target: key, color: palette[key], left });
    left += 53;
  }

  // 타겟
  const [target, setTarget] = useState(tabList[0].target);

  return (
    <Post>
      <h3>테마 변경하기</h3>
      <ThemeWrapper>
        <TabList>
          {tabList.map(tab => (
            <Tab
              key={tab.id}
              tab={tab}
              target={target}
              setTarget={setTarget} 
            />
          ))}
        </TabList>
        <Content target={target} />
      </ThemeWrapper>
    </Post>
  );
};

const Tab = ({ tab, target, setTarget }) => {
  const { id, target: key, color, left } = tab;
  //console.log('tab render');

  return <TabBox 
            id={id} 
            isActive={key === target} 
            color={color} 
            left={left} 
            onClick={() => setTarget(tab.target)}
          />;
}

const Content = React.memo(({ target }) => {
  const dispatch = useDispatch();
  const { layout: palette } = useSelector(state => state.palette);
  //console.log('content render');

  // 헥스 컬러 
  const getRandomHexColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += letters[Math.floor(Math.random() * 16)];
    }
    return hex;
  });
  
  const [hexColor, setHexColor] = useState(getRandomHexColor());
  const handleHexColor = useCallback(() => {
    setHexColor(getRandomHexColor());
  }, []);
  
  // 탭 선택할 때마다 랜덤컬러 변경하려면?! 
  // console.log(getRandomHexColor());
  // useEffect(() => {
  //   console.log('content mount!!!!');
  //   //setHexColor(getRandomHexColor());
  // });

  // 스와치(input[type=color]) 컬러 변경 
  const onChange = useCallback(e => setHexColor(e.target.value), []);

  // 리덕스 palette.layout 값 변경 
  const changeLayoutColor = () => {
    dispatch(
      setColor({
        key: target,
        value: hexColor,
      }),
    );
  };

  return (<ChangeWrapper color={palette[target]}>
    {target ? (
      <ColorWrapper>
        <Swatch target={target} hexColor={hexColor} onChange={onChange} />
        <PaletteWrapper>
          <Palette setHexColor={setHexColor} />
          <Button
            type="button"
            onClick={handleHexColor}
          >
            랜덤!
          </Button>
          <Button type="button" onClick={changeLayoutColor}>
            적용하기
          </Button>
        </PaletteWrapper>
      </ColorWrapper>
    ) : (
      <div className="pleasePick">변경할 색상의 탭을 선택하세요!</div>
    )}
  </ChangeWrapper>);
});

const Palette = React.memo(({ setHexColor }) => {
  const defaultColors = ['#e03131', '#d6336c', '#fd7e14', '#fab005', '#37b24d', '#15aabf', '#228be6', '#7048e8'];
  const humidColors = ['#ffc9c9', '#fcc2d7', '#ffd8a8', '#ffec99', '#b2f2bb', '#99e9f2', '#a5d8ff', '#d0bfff'];
  //console.log('palette render');

  return (
    <>
      <ColorList>
        {defaultColors.map((color, index) => (
          <Color
            key={index}
            color={color}
            onClick={() => setHexColor(color)}
          ></Color>
        ))}
      </ColorList>
      <ColorList>
        {humidColors.map((color, index) => (
          <Color
            key={index}
            color={color}
            onClick={() => setHexColor(color)}
          ></Color>
        ))}
      </ColorList>
    </>
  );
});

const Swatch = React.memo(({target, hexColor, onChange}) => {
  //console.log('swatch render');

  return (<SwatchBox color={hexColor}>
    <input
      type="color"
      name={target}
      value={hexColor}
      onChange={onChange}
      title="DON'T PASS ME! PICK ANOTHER COLOR!"
    />
    <p>{hexColor}</p>
    <p>{target}</p>
  </SwatchBox>);
});

export default ChangeTheme;
