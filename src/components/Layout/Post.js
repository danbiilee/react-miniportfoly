import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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
  .content-wrapper {
    padding: 20px;
  }
  .content-inner {
    margin-top: 60px;
    &:first-of-type {
      margin-top: 0;
    }
    &.mt30 {
      margin-top: 30px;
    }
    h4 {
      margin-bottom: 20px;
      color: #238db3;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
  .txt-wrapper {
    &:not(:first-of-type) {
      margin-top: 20px;
    }
    h5 {
      margin-bottom: 10px;
      color: #444;
      font-weight: bold;
      font-size: 1.2rem;
    }
    p {
      margin-bottom: 8px;
      line-height: 21px;
    }
  }
`;

const Post = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Post;
