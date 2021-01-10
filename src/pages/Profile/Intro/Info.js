import React from 'react';
import styled from 'styled-components';
import Post from '../../../components/Layout/Post';

const Wrapper = styled.div`
  padding: 40px;
  text-align: center;
  .info {
    margin-top: 40px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  h4 {
    color: #238db3;
    font-weight: bold;
    font-size: 1.5rem;
  }
  p,
  ul {
    margin: 10px 0;
    line-height: 20px;
  }
  li {
    margin: 5px 0;
  }
  .date {
    color: #aaa;
    font-weight: bold;
    font-size: 0.95rem;
  }
`;

const Info = ({ title }) => {
  return (
    <Post>
      <h3>{title}</h3>
      <div className="post-info">
        <p>이단비</p>
        <p>2021-01-05</p>
      </div>
      <Wrapper>
        <div className="info">
          <h4>이름</h4>
          <p>이단비</p>
        </div>
        <div className="info">
          <h4>생년월일</h4>
          <p>1992.08.19</p>
        </div>
        <div className="info">
          <h4>성별</h4>
          <p>여</p>
        </div>
        <div className="info">
          <h4>거주지</h4>
          <p>경기도 안양시</p>
        </div>
        <div className="info">
          <h4>MBTI</h4>
          <p>INFJ 혹은 INTJ</p>
        </div>
        <div className="info">
          <h4>취미</h4>
          <ul>
            <li>고양이, 강아지, 귀여운 애기들 사진 보기</li>
            <li>영화보기</li>
            <li>소설 및 만화책 읽기</li>
            <li>좋은 음악 찾기</li>
            <li>필름카메라 촬영하기</li>
            <li>가정용 미싱으로 가방만들기</li>
            <li>코바늘, 대바늘 뜨기</li>
          </ul>
        </div>
        <div className="info">
          <h4>휴대폰</h4>
          <p>010-4013-4147</p>
        </div>
        <div className="info">
          <h4>이메일</h4>
          <p>danbi.db@gmail.com</p>
        </div>
        <div className="info">
          <h4>SNS</h4>
          <ul>
            <li>
              <a href="https://github.com/danbiilee/" target="_blank">
                깃헙
              </a>
            </li>
            <li>
              <a href="https://velog.io/@dblee" target="_blank">
                블로그
              </a>
            </li>
          </ul>
        </div>
      </Wrapper>
    </Post>
  );
};

export default Info;
