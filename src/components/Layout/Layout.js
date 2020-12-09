import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setLayout } from '../../module/layout';

const Wrapper = styled.div`
  padding: 0 20px;
`;

const BorderWrapper = styled.div`
  height: 95vh;
  padding: 25px;
  background: ${props => props.theme.layout.layoutBg1};
  border: 1px solid ${props => props.theme.layout.layoutBorder1};
  border-radius: 10px;
`;

const BgWrapper = styled.div`
  display: flex;
  height: 100%;
  padding: 20px 8px;
  background: ${props => props.theme.layout.layoutBg2};
  border: 2px dashed ${props => props.theme.layout.layoutBorder2};
  border-radius: 10px;
`;

const Layout = ({ children }) => {
  const { layout } = useSelector(state => state);
  const dispatch = useDispatch();
  const layout1 = useRef();
  const layout2 = useRef();

  /* useEffect(() => {
    if(!layout.layout1) {
      dispatch(setLayout({
        key: 'layout1',
        value: layout1.current
      }));
    }
    if(!layout.layout2) {
      dispatch(setLayout({
        key: 'layout2',
        value: layout2.current
      }));
    }
  }, [layout, dispatch, layout1]); */

  return (
    <Wrapper>
      <BorderWrapper ref={layout1}>
        <BgWrapper ref={layout2}>{children}</BgWrapper>
      </BorderWrapper>
    </Wrapper>
  );
};

export default Layout;
