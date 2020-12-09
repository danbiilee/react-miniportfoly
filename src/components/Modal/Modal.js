import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 9999;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin: -${props => props.height / 2}px 0 0 -${props => props.width / 2}px;
  background: #fff;
  border-radius: 10px;
  border: 3px solid;
  h4 {
    height: 100px;
    background: ${props => props.bg};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    line-height: 100px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Modal = ({ isOpen, width, height, bg, children }) => {
  return (
    <>
      <Background isOpen={isOpen} />
      <ModalWrapper isOpen={isOpen} width={width} height={height} bg={bg}>
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;
