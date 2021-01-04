import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MdCached, MdDone } from 'react-icons/md';
import { setColor } from '../../module/palette';
import { getRandomHexColor } from '../../utils/utils';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #a5a5a5;
  border-left: 0;
  border-radius: 0 5px 5px 0;
  background: ${props => props.color};
  & > div:not(:last-of-type) {
    display: inline-block;
  }
  & > div:nth-child(2) {
    width: 55%;
  }
`;

const WhiteWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #a5a5a5;
  border-radius: 5px;
  background: #fff;
`;

const ColorsWrapper = styled.div``;

const Colors = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const Color = styled.li`
  width: 25px;
  height: 25px;
  background: ${props => props.color};
  cursor: pointer;
`;

const SwatchWrapper = styled.div`
  display: flex;
`;

const Swatch = styled.input`
  width: 50px;
  height: 55px;
  padding: 0;
  border: 0;
  background: none;
  outline: none;
  cursor: pointer;
`;

const SwatchInfo = styled.div`
  padding: 5px;
  p {
    font-size: 0.8rem;
  }
`;

const Buttons = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  height: 18px;
  margin-right: 8px;
  padding: 0 5px;
  line-height: 18px;
  font-weight: bold;
  font-size: 0.8rem;
  outline: 0;
  cursor: pointer;
`;

const Palette = ({ target, hexColor, setHexColor }) => {
  const dispatch = useDispatch();
  const { layout: palette } = useSelector(state => state.palette);

  // hexColor 변경
  const handleHexColor = useCallback(color => {
    setHexColor(color);
  }, []);

  // 스와치(input[type=color]) 컬러 변경
  const onChange = e => setHexColor(e.target.value);

  // 리덕스 스토어 palette.layout 컬러 변경
  const handleSkin = () => {
    dispatch(
      setColor({
        key: target,
        value: hexColor,
      }),
    );
  };

  return (
    <Wrapper color={palette[target]}>
      <WhiteWrapper>
        <SwatchWrapper>
          <Swatch
            type="color"
            name={target}
            value={hexColor}
            onChange={onChange}
            title="DON'T PASS ME! PICK ANOTHER COLOR!"
          />
          <SwatchInfo>
            <p>{target}</p>
            <Buttons>
              <Button
                type="button"
                onClick={() => handleHexColor(getRandomHexColor())}
              >
                <MdCached title="RANDOM!" />
              </Button>
              <Button type="button" onClick={handleSkin}>
                <MdDone title="APPLY!" />
              </Button>
            </Buttons>
          </SwatchInfo>
        </SwatchWrapper>
        <DefaultPalette hexColor={hexColor} handleHexColor={handleHexColor} />
      </WhiteWrapper>
    </Wrapper>
  );
};

const DefaultPalette = ({ handleHexColor }) => {
  const defaultColors = [
    '#e03131',
    '#d6336c',
    '#fd7e14',
    '#fab005',
    '#37b24d',
    '#15aabf',
    '#228be6',
    '#7048e8',
  ];
  const humidColors = [
    '#ffc9c9',
    '#fcc2d7',
    '#ffd8a8',
    '#ffec99',
    '#b2f2bb',
    '#99e9f2',
    '#a5d8ff',
    '#d0bfff',
  ];

  return (
    <ColorsWrapper>
      <Colors>
        {defaultColors.map((color, index) => (
          <Color
            key={index}
            color={color}
            onClick={() => handleHexColor(color)}
          ></Color>
        ))}
        {humidColors.map((color, index) => (
          <Color
            key={index}
            color={color}
            onClick={() => handleHexColor(color)}
          ></Color>
        ))}
      </Colors>
    </ColorsWrapper>
  );
};

export default React.memo(Palette);
