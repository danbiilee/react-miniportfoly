import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 0 20px;
`;

const ScrollToTop = ({ path, children }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = 0;
  }, [path]);

  return <Wrapper ref={scrollRef}>{children}</Wrapper>;
};

export default ScrollToTop;
