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
          <h4>직업</h4>
          <p>(예비)프론트엔드 개발자</p>
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
        <div className="info">
          <h4>이력사항</h4>
          <p>
            <span className="date">[2020년 03월 - 2020년 12월]</span> 소프트원.
            백엔드 개발자(사원)
          </p>
        </div>
        <div className="info">
          <h4>교육사항</h4>
          <p>
            <span className="date">[2019년 08월 - 2020년 03월]</span>{' '}
            KH정보교육원. 자바(JAVA) 프레임워크 개발자 양성과정
          </p>
        </div>
        <div className="info">
          <h4>학력사항</h4>
          <ul>
            <li>
              <span className="date">[2012년 03월 - 2015년 02월]</span>{' '}
              한양여자대학교 니트패션디자인과 졸업
            </li>
            <li>
              <span className="date">[2010년 05월]</span> 고등학교 검정고시
            </li>
          </ul>
        </div>
        <div className="info">
          <h4>자격증</h4>
          <ul>
            <li>
              <span className="date">[2019년 12월]</span> SQLD
            </li>
            <li>
              <span className="date">[2016년 07월]</span> 정보처리산업기사
            </li>
          </ul>
        </div>
      </Wrapper>
    </Post>
  );
};

export default Info;
