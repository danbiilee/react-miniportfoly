import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { select } from 'd3';
import Post from '../../../components/Layout/Post';

const Wrapper = styled.div``;

const Chart = styled.svg`
  width: 100%;
`;

const Skills = ({ title }) => {
  const svgRef = useRef();
  // html/css, js, vue.js, react.js, java, oracle, mysql, node.js, mongoDB
  const skillData = [70, 60, 30, 40, 50, 50, 30, 10, 5];
  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('bar')
      .data(skillData)
      .enter()
      .append('rect')
      .attr('height', d => d)
      .attr('width', 40)
      .attr('x', (d, i) => 50 * i)
      .attr('y', (d, i) => 100 - skillData[i]);
  }, []);

  return (
    <Post>
      <h3>{title}</h3>
      <div className="post-info">
        <p>이단비</p>
        <p>2021-01-05</p>
      </div>
      <Wrapper>
        <Chart ref={svgRef} />
      </Wrapper>
    </Post>
  );
};

export default Skills;
