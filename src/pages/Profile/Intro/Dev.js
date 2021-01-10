import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import Post from '../../../components/Layout/Post';

const SkillChart = styled.svg`
  width: 100%;
  height: 300px;
  overflow: hidden;
  .grid tick line {
    stroke: gray;
  }
  #limit {
    stroke: #238db3;
    stroke-width: 3;
    stroke-dasharray: 5;
  }
  .value {
    fill: #333;
    font-size: 0.8rem;
  }
`;

const HisChart = styled.svg`
  width: 100%;
  height: 80px;
  margin-left: -10px;
  rect {
    stroke: #eee;
    cursor: pointer;
  }
  .subTitle {
    fill: #333;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;

const Dev = ({ title }) => {
  const widthRef = useRef();
  const skillSvgRef = useRef();

  const skillData = [
    {
      title: 'HTML & CSS',
      value: 65,
      color: '#d9a1ab',
    },
    {
      title: 'JS',
      value: 70,
      color: '#d9a1ab',
    },
    {
      title: 'React.js',
      value: 55,
      color: '#ceb5df',
    },
    {
      title: 'Vue.js',
      value: 35,
      color: '#ceb5df',
    },
    {
      title: 'Node.js',
      value: 15,
      color: '#dcdfb5',
    },
    {
      title: 'Java',
      value: 50,
      color: '#dcdfb5',
    },
    {
      title: 'Oracle',
      value: 40,
      color: '#bddfb5',
    },
    {
      title: 'Mysql',
      value: 30,
      color: '#bddfb5',
    },
  ];

  useEffect(() => {
    const svg = d3.select(skillSvgRef.current);
    const chart = svg.append('g').attr('transform', `translate(40, 20)`);

    const margin = 50;
    // width: 렌더링될 때의 화면 너비에 맞춤
    const width = widthRef.current.clientWidth - margin * 2;
    const height = 350 - margin * 2;

    // scaleLinear() 사용
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

    // 점수 셋팅: display none
    barGroups
      .append('text')
      .attr('class', 'value')
      .attr('id', d => d.title.substring(0, 2))
      .attr('x', d => xScale(d.title) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.value) + 30)
      .attr('text-anchor', 'middle')
      .text(d => d.value)
      .style('display', 'none');

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
      .on('mouseenter', function (r, i) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.7)
          .attr('x', d => xScale(d.title) - 2)
          .attr('width', xScale.bandwidth() + 4);

        // 점수 표시
        d3.selectAll(`#${i.title.substring(0, 2)}`).style('display', 'block');

        // 가이드 눈금선 표시
        const y = yScale(i.value);
        chart
          .append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', d => xScale(d.title))
          .attr('width', xScale.bandwidth());

        d3.selectAll('.value').style('display', 'none');
        chart.selectAll('#limit').remove();
      });

    barGroups
      .selectAll('text')
      .on('mouseenter', function (r, i) {
        d3.selectAll(`#${i.title.substring(0, 2)}`).style('display', 'block');
      })
      .on('mouseleave', function () {
        d3.selectAll('.value').style('display', 'none');
      });
  }, []);

  const hisSvgRef = useRef();
  const hisData = [
    {
      title: 'softone',
      subTitle: 'SI근무',
      start: new Date(2020, 0, 1),
      end: new Date(2021, 0, 1),
      color: '#d9a1ab',
    },
    {
      title: 'kh',
      subTitle: '수료',
      start: new Date(2019, 0, 1),
      end: new Date(2020, 0, 1),
      color: '#ceb5df',
    },
    {
      title: 'null',
      subTitle: '방황',
      start: new Date(2016, 0, 1),
      end: new Date(2019, 0, 1),
      color: '#dcdfb5',
    },
    {
      title: 'knit',
      subTitle: '니트패션디자인',
      start: new Date(2012, 0, 1),
      end: new Date(2016, 0, 1),
      color: '#bddfb5',
    },
  ];

  useEffect(() => {
    const svg = d3.select(hisSvgRef.current);
    const chart = svg.append('g').attr('transform', `translate(40, 20)`);

    const margin = 60;
    // width: 렌더링될 때의 화면 너비에 맞춤
    const width = widthRef.current.clientWidth - margin * 2;

    // scaleTime() 사용
    const xScale = d3
      .scaleTime()
      .range([0, width])
      .domain([new Date(2012, 0, 1), new Date(2021, 0, 1)]);

    // x축 만들기
    chart.append('g').call(d3.axisTop(xScale));

    //bar 만들기
    const barGroups = chart.selectAll().data(hisData).enter().append('g');
    barGroups
      .append('rect')
      .attr('x', d => xScale(d.start))
      .attr('y', 1)
      .attr('width', d => xScale(d.end) - xScale(d.start))
      .attr('height', 30)
      .attr('fill', d => d.color);

    // 타이틀 셋팅: display none
    barGroups
      .append('text')
      .attr('class', 'subTitle')
      .attr('id', d => d.subTitle)
      .attr('x', d => xScale(d.start) + (xScale(d.end) - xScale(d.start)) / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text(d => d.subTitle)
      .style('display', 'none');

    // 이벤트
    barGroups
      .selectAll('rect, text')
      .on('mouseenter', function (r, i) {
        d3.select(this).transition().duration(300).attr('opacity', 0.7);
        d3.selectAll(`#${i.subTitle}`).style('display', 'block');
      })
      .on('mouseleave', function (r, i) {
        d3.select(this).transition().duration(300).attr('opacity', 1);
        d3.selectAll(`#${i.subTitle}`).style('display', 'none');
      });
  }, []);

  return (
    <Post>
      <h3>{title}</h3>
      <div className="post-info">
        <p>이단비</p>
        <p>2021-01-06</p>
      </div>
      <div className="content-wrapper" ref={widthRef}>
        <div className="content-inner mt30">
          <h4>기술</h4>
          <SkillChart ref={skillSvgRef} />
        </div>
        <div className="content-inner mt60">
          <h4>히스토리</h4>
          <HisChart ref={hisSvgRef} />
          <div className="txt-wrapper">
            <h5>:: 2020 - 현재</h5>
            <p>
              <span className="date">[2021년 01월 - ]</span>
              프론트엔드 개발자로 이직 준비중
            </p>
            <p>
              <span className="date">[2020년 05월 - 2020년 06월]</span> 탈잉,
              실무자에게 배우는 리액트 웹프로그래밍 수료
            </p>
            <p>
              <span className="date">[2020년 03월 - 2020년 12월]</span>
              소프트원, 백엔드 개발자
            </p>
          </div>
          <div className="txt-wrapper">
            <h5>:: 2019 - 2020</h5>
            <p>
              <span className="date">[2019년 08월 - 2020년 03월]</span>
              KH정보교육원, 자바 프레임워크 개발자 양성과정 수료
            </p>
          </div>
          <div className="txt-wrapper">
            <h5>:: 2016 - 2019</h5>
            <p>20대 암흑기</p>
          </div>
          <div className="txt-wrapper">
            <h5>:: 2012 - 2016</h5>
            <p>
              <span className="date">[2015년 03월 - 2015년 10월]</span>
              트윈텍스타일, 니트디자이너
            </p>
            <p>
              <span className="date">[2012년 03월 - 2015년 02월]</span>
              한양여자대학교 니트패션디자인과 졸업
            </p>
          </div>
        </div>
      </div>
    </Post>
  );
};

export default Dev;
