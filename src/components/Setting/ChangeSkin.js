import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import PaletteTab from './PaletteTab';
import Palette from './Palette';

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background: #fff;
`;

const ToggleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    font-weight: bold;
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  cursor: pointer;
`;

const ToggleContent = styled.div`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  padding: 10px 0;
`;

const ChangeSkin = () => {
  console.log('ChangeSkin');

  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState('layoutBg1');
  const [hexColor, setHexColor] = useState('#ffc9c9');

  const onClick = () => setIsOpen(!isOpen);

  return (
    <Wrapper>
      <ToggleHeader>
        <h2>배경 바꾸기</h2>
        <ToggleButton onClick={onClick}>
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </ToggleButton>
      </ToggleHeader>
      <ToggleContent isOpen={isOpen}>
        <PaletteTab
          target={target}
          setTarget={setTarget}
          setHexColor={setHexColor}
        />
        <Palette
          target={target}
          hexColor={hexColor}
          setHexColor={setHexColor}
        />
      </ToggleContent>
    </Wrapper>
  );
};

export default React.memo(ChangeSkin);
