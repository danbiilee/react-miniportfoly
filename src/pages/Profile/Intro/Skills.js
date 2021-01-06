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
  height: 300px;
  overflow: hidden;
  path {
    storke: gray;
  }
  line {
    storke: gray;
  }
  .grid tick line {
    stroke: gray;
  }
`;

const Skills = ({ title }) => {
  const widthRef = useRef();
  const svgRef = useRef();

  const skillData = [
    {
      title: 'HTML & CSS',
      value: 75,
      color: '#d9a1ab',
    },
    {
      title: 'Javascript',
      value: 62,
      color: '#d9a1ab',
    },
    {
      title: 'React.js',
      value: 45,
      color: '#ceb5df',
    },
    {
      title: 'Vue.js',
      value: 32,
      color: '#ceb5df',
    },
    {
      title: 'Node.js',
      value: 15,
      color: '#dcdfb5',
    },
    {
      title: 'Java',
      value: 53,
      color: '#dcdfb5',
    },
    {
      title: 'Oracle',
      value: 38,
      color: '#bddfb5',
    },
    {
      title: 'Mysql',
      value: 28,
      color: '#bddfb5',
    },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const chart = svg.append('g').attr('transform', `translate(40, 20)`);

    const margin = 50;
    const width = widthRef.current.clientWidth - margin * 2; // 화면 사이즈에 맞춤
    const height = 350 - margin * 2;

    const yScale = d3.scaleLinear().range([height, 0]).domain([0, 100]);
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(skillData.map(d => d.title))
      .padding(0.4);

    // x축, y축 만들기
    chart.append('g').call(d3.axisLeft(yScale));
    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // 수평 그리드선 만들기
    chart
      .append('g')
      .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(''));

    // bar 만들기
    const barGroups = chart.selectAll().data(skillData).enter().append('g');
    barGroups
      .append('rect')
      .attr('x', d => xScale(d.title))
      .attr('y', height)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', d => d.color);

    // 애니메이션 효과
    barGroups
      .selectAll('rect')
      .transition()
      .duration(800)
      .attr('y', d => yScale(d.value))
      .attr('height', d => height - yScale(d.value));

    // 마우스 이벤트
    barGroups
      .selectAll('rect')
      .on('mouseenter', function () {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.7)
          .attr('x', d => xScale(d.title) - 2)
          .attr('width', xScale.bandwidth() + 4);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', d => xScale(d.title))
          .attr('width', xScale.bandwidth());
      })
      .on('click', function () {});

    return () => {
      svg.remove();
    };
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
        <div className="skill">
          <h4>삽질을 통해 얻은 교훈</h4>
          <div className="txtWrapper">
            <p>
              위에 기재한 프로젝트를 시작으로 제 흥미와 관심이 프론트단에 많이
              기울기 시작했습니다. SI에 백엔드 개발자로 취업을 한 뒤, DB
              작업이나 얕게나마 배포, 서버 관련 지식들도 이것 저것 주워들으며
              일했지만 프론트단에서 작업할 때보다 지루하다는 느낌을 떨칠 수
              없었습니다.
            </p>
            <p>
              그러다 제가 진행할 메인 프로젝트가 정해졌고, 거기서 Vue.js를
              사용한다는 말에 자바스크립트를 다시 공부해야겠다는 생각이
              들었습니다. 학원에서 배운 자바스크립트는 오래된 문법 위주였고,
              시간관계상 아주 빠르게 배우고 넘어갔기에 처음부터 다시 배울 필요가
              있었습니다.
            </p>
            <p>
              그렇게 근무 외 시간에 공부를 하다보니 어느 샌가 맘 속에선
              프론트엔드로의 이직이 확정이 되어버렸습니다. 그러다 React.js의
              `핫`함에 혹해 업무에서 사용하는 Vue.js와는 별개로 6주간 주말에
              오프라인 강의를 듣기도 했습니다. Vue.js보다 자바스크립트 친화적인
              React.js에 더 매력을 느꼈습니다. 그래서 그 뒤에는 React.js를
              이용해 홀로 토이 프로젝트를 하려고 많은 시간을 투자했으나, 갑자기
              Node.js, MongoDB 등을 사용하는 등 과한 욕심으로 인해 완벽히 마무리
              지은 것 없이 퇴사를 하게 되었습니다.
            </p>
            <p>
              2020년 한 해동안의 무수한 삽질을 통해 내가 가야할 길은 백엔드가
              아니라 프론트엔드라는 확신을 얻었습니다. 동시에 처음부터 여러
              마리의 토끼를 잡으려 하기보단 먼저 하나에 집중하고 점차 영역을
              넓혀가는 것이 좋겠다는 결론을 내렸습니다. 따라서 주니어 개발자때는
              자바스크립트와 프로그래밍 기초가 되는 자료구조, 운영체제 등을
              위주로 학습하려 합니다.
            </p>
          </div>
        </div>
        <div className="skill">
          <h4>스킬트리</h4>
          <div className="txtWrapper">
            <p>
              가장 먼저, 당당하게 `나의 주력 언어는 자바스크립트입니다`라고 말할
              수 있도록 자바스크립트에 능통해지는 것이 목표입니다. 따라서 단순히
              내장 메서드들의 사용 방법만을 익힌 정도가 아닌, 그 동작 원리까지
              정확히 이해하고 사용할 수 있도록 기본에 충실한 학습을 할
              계획입니다. 그리고 ECMAScript 2020의 새로운 기능들도 익히며, 최신
              자바스크립트 동향에 민감한 프론트엔드 개발자가 되기 위해 노력할
              것입니다.
            </p>
            <p>
              그 다음으로는 CSS에 집중하고 싶습니다. CSS를 마치 포토샵처럼
              사용해 웹에서 원하는 디자인의 레이아웃, 오브젝트, 패턴 등을
              자유자재로 만들 수 있는 개발자가 되고 싶습니다.
            </p>
            <p>
              그리고 HTML의 CANVAS나 Three.js와 같은 다양한 API를 학습하여,
              웹에서 3D 그래픽 구현을 해보고 싶습니다. 3D를 이용하면 웹 안에서
              만들 수 있는 컨텐츠들이 무궁무진 해질 것이고, 그럼 조금 더 재밌게
              개발을 할 수 있을 거라는 생각이 듭니다.
            </p>
            <p>
              마지막으론 컴퓨터 공학에 대해 제대로 공부하는 시간을 갖고
              싶습니다. 시간적 여유가 된다면 차차 컴퓨터 공학을 전공으로
              학사학위와 석사학위를 취득하고 싶은 욕심도 있습니다.
            </p>
          </div>
        </div>
      </Wrapper>
    </Post>
  );
};

export default Skills;
