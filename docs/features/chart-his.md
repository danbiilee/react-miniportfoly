# D3.js 

## 히스토리 

```js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const History = ({ title }) => {
  const widthRef = useRef(); 
  const svgRef = useRef(); 

  const hisData = [
    {
      title: 'softone',
      subTitle: 'SI',
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
      subTitle: '첫취업',
      start: new Date(2012, 0, 1),
      end: new Date(2016, 0, 1),
      color: '#bddfb5',
    },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
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

  // code...
};
```

 
