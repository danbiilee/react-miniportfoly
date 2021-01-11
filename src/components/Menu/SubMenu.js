import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const ListDiv = styled.div`
  h2 {
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    font-weight: bold;
    a {
      color: ${props => props.theme.mainColor.color};
    }
  }
  nav > ul > li > a {
    font-weight: bold;
  }
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    font-size: 0.9rem;
    li {
      padding: 5px;
    }
    ul {
      padding-left: 15px;
    }
    a {
      color: ${props => props.theme.textColor.color};
      &.selected {
        color: ${props => props.theme.mainColor.color};
        font-weight: bold;
      }
    }
  }
`;

const SubMenu = ({ title, list }) => {
  const match = useRouteMatch();

  return (
    <ListDiv>
      <h2>
        <NavLink exact to={match.url}>
          {title}
        </NavLink>
      </h2>
      <nav>
        <ul>
          {list.map(item => (
            <li key={item.id}>
              <NavLink to={match.url + item.url}>{item.title}</NavLink>
              {item.child && (
                <ul>
                  {item.child.map(child => (
                    <li key={child.id}>
                      <NavLink
                        to={match.url + item.url + child.url}
                        activeClassName="selected"
                      >
                        {child.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ListDiv>
  );
};

export default SubMenu;
