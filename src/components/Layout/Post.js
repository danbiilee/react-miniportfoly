import React from 'react';
import styled from 'styled-components';

const Article = styled.article`
  width: 100%;
  height: max-content;
  margin: 10px 0;
  h3 {
    height: 30px;
    margin-bottom: 10px;
    background: #eee;
    border-top: 1px solid #aaa;
    color: #333;
    text-align: center;
    font-weight: bold;
    line-height: 30px;
  }
  .post-info {
    display: flex;
    justify-content: space-between;
    margin: 10px 5px;
    p:first-of-type {
      color: ${props => props.theme.textColor.color};
    }
    p:last-of-type {
      font-size: 0.9rem;
    }
  }
`;

const Post = ({ children }) => {
  return <Article>{children}</Article>;
};

export default Post;
