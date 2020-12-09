import React from 'react';
import styled from 'styled-components';

const SidebarBlock = styled.div`
  width: 25%;
  margin-right: 8px;
  & > ul {
    display: flex;
    justify-content: center;
    font-size: 0.8rem;
    line-height: 1.4;
    li:first-of-type {
      padding-right: 10px;
      margin-right: 10px;
      border-right: 1px solid;
    }
  }
`;

const Sidebar = ({ children }) => {
  return (
    <SidebarBlock>
      <ul>
        <li>TODAY 0</li>
        <li>TOTAL 0</li>
      </ul>
      {children}
    </SidebarBlock>
  );
};

export default Sidebar;
