import React from 'react';
import styled, { css } from 'styled-components';

const Article = styled.article`
  width: 100%;
  height: ${props => (props.fullHeight ? '100%' : 'max-content')};
  /* height: 88%; */
  margin: 50px 0;
  &:first-of-type {
    margin-top: 30px};
  }
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
      color: ${props => props.theme.layout.textColor};
    }
    p:last-of-type {
      font-size: 0.9rem;
    }
  }
  .post-contents {
    img {
    }
    p {
      padding: 20px 10px;
    }
  }
`;

const Post = ({ fixed, children }) => {
  return <Article fixed={fixed}>{children}</Article>;
};

export default Post;
