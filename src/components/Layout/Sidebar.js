import React from 'react';
import styled from 'styled-components';

const SidebarBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 100%;
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
  .today {
    color: #e03131;
  }
`;

const Sidebar = ({ children }) => {
  return (
    <SidebarBlock>
      <ul>
        <li>
          TODAY <span className="today">1</span>
        </li>
        <li>TOTAL 999999</li>
      </ul>
      {children}
    </SidebarBlock>
  );
};

export default Sidebar;
