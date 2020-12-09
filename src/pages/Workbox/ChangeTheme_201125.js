import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { setColor } from '../../module/palette';
import Post from '../../components/Layout/Post';
import Modal from '../../components/Modal/Modal';

const PaletteWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    position: absolute;
    border-radius: 50%;
  }
`;

const Circle = styled.div`
  top: ${props => props.gap}px;
  left: ${props => props.gap}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.bg};
  ${props =>
    props.border &&
    css`
      border: 10px ${props.borderType} ${props.border};
    `}
`;

// Modal
const ColorWrapper = styled.div`
  display: flex;
`;
const Color = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p:first-of-type {
    font-weight: bold;
    font-size: 1.2rem;
  }
  div {
    width: 50px;
    height: 50px;
    background: ${props => props.color};
  }
  input {
    width: 54px;
    height: 54px;
    border: 0;
    margin: 0;
    padding: 0;
    background: none;
  }
`;

const ChangeTheme = () => {
  // Redux
  const dispatch = useDispatch();
  const { palette } = useSelector(state => state.palette);

  // Selected layout & hexColor
  const [layout, setLayout] = useState('');
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
  const handleHexColor = e => {
    setHexColor(e.target.value);
  };

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = layout => {
    // Open modal = false -> true
    if (!isOpen) {
      // Q. how to detect new hexCode after setHexColor????
      const newHexColor = getRandomHexColor();
      /* setLayout(layout); */
      setHexColor(newHexColor);
    }
    setIsOpen(!isOpen);
  };

  // Change Color
  const changeColor = () => {
    dispatch(setColor(layout, hexColor));
    setIsOpen(!isOpen);
  };

  return (
    <Post>
      <h3>테마 변경하기</h3>
      <Modal isOpen={isOpen} width={500} height={300} bg="lightgoldenrodyellow">
        <h4>🎨 색을 선택하세요!</h4>
        <ColorWrapper>
          <Color color={palette[layout]}>
            <p>BEFORE</p>
            <div></div>
            <p>{palette[layout]}</p>
          </Color>
          <Color color={hexColor}>
            <p>AFTER</p>
            <input
              type="color"
              name={layout}
              value={hexColor}
              onChange={handleHexColor}
            />
            <p>{hexColor}</p>
          </Color>
        </ColorWrapper>

        <div>
          <button type="button" onClick={handleModal}>
            닫기
          </button>
          <button type="button" onClick={changeColor}>
            적용하기
          </button>
        </div>
      </Modal>

      <PaletteWrapper>
        <Circle
          size="500"
          gap="0"
          bg={palette.outer}
          onClick={() => handleModal('outer')}
        />
        <Circle
          size="450"
          gap="25"
          bg={palette.layoutBorder1}
          onClick={() => handleModal('layoutBorder1')}
        />
        <Circle
          size="430"
          gap="35"
          bg={palette.layoutBg1}
          onClick={() => handleModal('layoutBg1')}
        />
        <Circle
          size="380"
          gap="60"
          bg={palette.layoutBg2}
          border={palette.layoutBorder2}
          borderType="dashed"
          onClick={() => handleModal('layoutBorder2')}
        />
        <Circle
          size="330"
          gap="85"
          bg={palette.layoutBg2}
          onClick={() => handleModal('layoutBg2')}
        />
        <Circle
          size="310"
          gap="95"
          bg={palette.cardBorder}
          onClick={() => handleModal('cardBorder')}
        />
        <Circle
          size="290"
          gap="105"
          bg={palette.cardBg}
          onClick={() => handleModal('cardBg')}
        />
        <Circle
          size="240"
          gap="130"
          bg={palette.mainColor}
          onClick={() => handleModal('mainColor')}
        />
        <Circle
          size="190"
          gap="155"
          bg={palette.headerColor}
          onClick={() => handleModal('headerColor')}
        />
        <Circle
          size="170"
          gap="165"
          bg="white"
          border={palette.textColor}
          borderType="solid"
          onClick={() => handleModal('textColor')}
        />
      </PaletteWrapper>
    </Post>
  );
};

export default ChangeTheme;
