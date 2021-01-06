import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import Post from '../../../components/Layout/Post';

const Wrapper = styled.div`
  padding: 20px;
  .skill {
    margin-top: 60px;
    &:first-of-type {
      margin-top: 30px;
    }
  }
  h4 {
    margin-bottom: 10px;
    color: #238db3;
    font-weight: bold;
    font-size: 1.5rem;
  }
  p {
    margin-bottom: 7px;
    line-height: 20px;
  }
`;

const Chart = styled.svg`
  width: 100%;
`;

const History = ({ title }) => {
  const widthRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Post>
      <h3>{title}</h3>
      <div className="post-info">
        <p>이단비</p>
        <p>2021-01-06</p>
      </div>
      <Wrapper ref={widthRef}>
        <Chart ref={svgRef} />
        <div className="skill">
          <h4>나의 첫 프론트 프로젝트</h4>
          <div className="txtWrapper">
            <p>
              KH정보교육원을 수료할 당시, 중간에 짧게 HTML부터 자바스크립트까지
              학습 후 약 1주간 간단히 개인 웹페이지를 만드는 시간이 있었습니다.
              그 때 모든 페이지의 레이아웃에 CSS의 Grid를 적용했고,
              자바스크립트의 객체, 생성자 함수 등을 최대한 활용해서 유튜브
              동영상을 불러오고, 찜하는 기능을 구현했습니다.
            </p>
            <p>
              그리고 페이지마다 반복되는 HTML, CSS 코드를 줄이고자 수업 때
              다루지 않은 Gulp를 이용해 file-include와 SCSS를 적용했고, 그 결과
              프로젝트 전체 코드의 효율성을 대폭 높일 수 있었습니다.
            </p>
          </div>
        </div>
      </Wrapper>
    </Post>
  );
};

export default History;
