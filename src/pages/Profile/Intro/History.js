import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import Post from '../../../components/Layout/Post';

const Wrapper = styled.div`
  position: relative;
  padding: 20px;
  .history {
    margin-top: 0px;
    display: none;
  }
  .history#info {
    display: block;
    h4 {
      text-align: center;
    }
  }
  h4 {
    &:not(:first-of-type) {
      margin-top: 30px;
    }
    margin-bottom: 20px;
    color: #238db3;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .txtWrapper {
    &:not(:first-of-type) {
      margin-top: 20px;
    }
  }
  h5 {
    margin-bottom: 10px;
    color: #444;
    font-weight: bold;
    font-size: 1.2rem;
  }
  p {
    margin-bottom: 7px;
    line-height: 20px;
  }
`;

const Chart = styled.svg`
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

    const margin = 50;
    const width = widthRef.current.clientWidth - margin * 2; // 화면 사이즈에 맞춤

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
      })
      .on('click', function (r, i) {
        // 알림문구 삭제
        document.querySelector('#info').style.display = 'none';
        // 해당 내용 오픈
        document
          .querySelectorAll('.history')
          .forEach(item => (item.style.display = 'none'));
        const content = document.querySelector(`#${i.title}`);
        content.style.display = 'block';
      });

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
        <div className="history" id="info">
          <h4>막대를 클릭해보세요!</h4>
        </div>
        <div className="history" id="softone">
          <h4>첫 실무 경험</h4>
          <div className="txtWrapper">
            <h5>:: 사이트 오픈을 경험하다</h5>
            <p>
              학원을 수료 후 곧바로 SI 회사인 소프트원에 취업했습니다. 그
              중에서도 공공사업 프로젝트를 하는 팀에 들어가 국립환경과학원의
              주관하에 가습기 살균제 피해자들을 위한 건강모니터링 시스템 개발을
              하게 됐습니다.
            </p>
            <p>
              해당 프로젝트의 과업은 기존의 설치형 프로그램을 웹으로 전환하는
              것이었는데, 추후 배포가 이루어질 서버의 자원이
              한국환경산업기술원에 있었으나, 초반에 과학원과 기술원의 협업이
              매끄럽게 이루어지지 않아 기술원의 서버를 사용할 수가 없었다는
              점이었습니다. 따라서 번거롭지만 개발한 소스코드를 들고 직접
              보건센터에 방문해, 각 컴퓨터에 MariaDB와 윈도우 톰캣을 설치해
              로컬에서 배포를 해야 했습니다.
            </p>
            <p>
              그런데 9월, 갑자기 일정이 변경되어 추석 전 오픈을 목표로
              전환작업을 하게 되었습니다. 사실 잦은 외근과 출장은 시간이 지나자
              익숙해져 그리 힘들지 않았습니다. 하지만 개발자가 저 혼자인
              상태에서 급하게 사이트 오픈 준비를 하는 건 정말 정신적으로도,
              체력적으로도 고된 일이었습니다. MariaDB에서 Oracle로, 톰캣에서
              제우스로 개발 환경을 바꾸면서 수정해야 했던 코드들과 매일 쌓이기만
              하는 수정 요청사항에 파묻혀, 도망가고 싶다는 생각이 자꾸만
              들었습니다.
            </p>
            <p>
              하지만 이 또한 시간이 지나면 다 좋은 경험이 될거라고, 이겨낼 수
              있다고 믿고 또 믿으며 인내했습니다. 아무리 힘들어도 인상 찌푸리지
              않았고, 힘이 들수록 다른 동료와 농담 따먹기를 하면서 기분을
              전환시키려 노력했습니다. 그 결과 무사히 사이트 오픈을 하게 되었고,
              방문 때마다 보건센터들의 실무자와 좋은 관계를 유지해 비협조적이던
              보건센터들의 협력을 이루어내어, 모든 보건센터의 실무자가 참석한
              가운데에 화기애애한 분위기 속에서 완료보고회를 할 수 있었습니다.
            </p>
          </div>
        </div>
        <div className="history" id="kh">
          <h4>예전의 내가 아니야</h4>
          <div className="txtWrapper">
            <h5>:: C등급에서 A등급으로</h5>
            <p>
              KH정보교육원의 수업이 시작되고, 긴장 반 설렘 반으로 프로그래밍을
              접했습니다. 더 이상 예전처럼 자신감 없이 `난 비전공자라 안
              될거야`라는 생각은 하지 않았습니다. 그저 잘 하고 싶었고, 전공자
              친구들 사이에서도 기죽지 않고 이들만큼 혹은 나중엔 이들보다 더
              잘하게 되고 싶었습니다.
            </p>
            <p>
              간절함으로 무장한 채 매일 복습과 과제를 거르지 않고 하며, 오가는
              대중교통에서도 자바의 정석과 인사이드 자바스크립트 책을
              읽었습니다. 또 작은 프로젝트도 최고의 결과물을 만들어내기 위해
              많은 시간을 쏟아부었고, 프로젝트 기간마다 점심에 밥이 안 넘어갈
              만큼 제 자신을 채찍질하며 몰두했습니다.
            </p>
            <p>
              그 결과 처음 자리배치 할 때 받은 C등급이 그 다음 자리배치 땐
              A등급으로 수직 상승했고, 파이널 프로젝트 때는 반 전체 투표로
              팀장에 뽑히기도 했습니다. 반복문도 어려워하던 왕초보가 전공자가
              대부분이던 반 친구들과 어깨를 나란히 하며 함께 프로젝트를 진행할
              수 있게 된 것입니다. 또한 반에서 단 한 명에게만 주어지는 우수상을
              수여했으며, 학원 연계 면접에서도 그 성실함을 인정받아 수료와
              동시에 회사에 취업하게 되었습니다.
            </p>
          </div>
          <h4>폭풍같았던 팀 프로젝트</h4>
          <div className="txtWrapper">
            <h5>:: 백지장도 맞들면 낫다</h5>
            <p>
              학원에서 진행한 첫 번째 팀 프로젝트는 같은 줄에 앉아있던 친구
              2명과 함께 자바 GUI를 이용해 아이스크림 주문 키오스크를 개발하는
              것이었습니다. 이 때는 저를 포함한 모든 팀원들이 자바의
              객체지향이나 상속의 개념을 완벽히 이해하지 못했고, 데이터 연동의
              개념이 없었기 때문에 처음 계획한 기능을 전부 구현할 수는
              없었습니다.
            </p>
            <p>
              그럼에도 저는 `우리가 이걸 할 수 있을까`라는 회의적인 반응을
              보이던 팀원들의 성향에 아쉬움을 느꼈습니다. 하지만 이 때는 주어진
              기간도 짧았고, 제가 팀장도 아니었기 떄문에 팀원들의 사기를 올려
              도움을 얻고자하기 보다는 혼자라도 해야된다는 생각으로 무리하게
              밤을 새우며 프로젝트를 마무리했었습니다. 프로젝트 기간 동안
              팀원들과 같은 목표를 가지지 못했다는 점에서 많은 아쉬움이 남았고,
              왜 팀 프로젝트가 어렵고 소통이 중요하다고 하는지를 몸소 깨달을 수
              있었습니다.
            </p>
          </div>
          <div className="txtWrapper">
            <h5>:: 힘들 수록 웃자</h5>
            <p>
              그래서 그 다음에 진행된 두 번째 팀 프로젝트는 끝까지 모든 팀원들이
              적극적으로 참여하는 걸 목표로 시작하게 되었습니다. 저 또한 더이상
              팀장이 아니라고 나서지 않는 소극적인 태도는 버리고, 처음에 낯을
              많이 가리던 팀장을 도와 팀원들의 의견을 모으고, 스터디 일정을 잡는
              등 적극적으로 서포트를 했습니다.
            </p>
            <p>
              세미 프로젝트 치고는 규모가 큰 쇼핑몰을 기획해서 작업량이
              상당했지만, 다들 본인이 맡은 페이지의 개발을 기한 내 끝내기 위해
              노력하면서도 불평없이 다른 팀원들의 에러를 함께 확인하고, 수정하기
              위해 시간을 할애하려는 모습을 보면서 깊은 감동을 받았습니다. 또
              깃을 처음 쓰면서 다같이 삽질하는 시간이 꽤 많았습니다. 그럴 때마다
              자연스럽게 팀원들과 수다를 떨고 농담따먹기를 하다보면 어느 샌가
              문제가 해결되어 있는 걸 보면서 힘들 수록 웃고 그 상황을 즐겨야
              한다는 걸 배웠습니다.
            </p>
            <p>
              이러한 경험을 바탕으로 회사에서도 힘든 일이 있을 때 팀원과
              공유하고, 잠깐이라도 수다를 떨면서 기분을 환기시키려 했습니다.
              그래서 한동안 업무 때문에 정말 스트레스 받던 시기가 있었음에도
              불구하고, 다른 팀원들은 그 때 그렇게 힘들어하는 줄 전혀 몰랐다고
              말할 정도로 현명하게 어려운 시간을 견뎌낼 수 있었던 것 같습니다.
            </p>
          </div>
        </div>
        <div className="history" id="null">
          <h4>20대의 중간에서</h4>
          <div className="txtWrapper">
            <h5>:: 방황은 간절함의 어머니</h5>
            <p>
              의류업계에서 완전히 발을 뗀 후에는 한동안 우울한 시기를 보내야
              했습니다. 아무 것도 하고 싶은 게 없었고, 나에 대한 자신감과
              자존감이 바닥을 쳤습니다. 한동안 아르바이트만 전전하며 지냈고, 한
              때 퍼블리셔가 되려고도 하였지만 제대로 시도조차 하지 않고 쉽게
              포기할만큼 모든 것에 무기력했습니다.
            </p>
            <p>
              그러다 한참 시간이 지나 불현듯 포기했던 퍼블리셔 공부가 떠올랐고,
              갑자기 뭐에 홀린듯 개발자가 되어야겠다고 결심했습니다.
              프로그래밍의 `프`자도 모르던 저였지만 한 번 결심을 하고 나니,
              절실함과 간절함이 생겨나기 시작했습니다. 어떻게든 제 힘으로 이 긴
              방황의 시간을 끝내고 웃고 싶다고 생각했습니다. 그리고 거짓말 같이
              학원을 우수한 성적으로 수료하며, 곧장 취업을 하게 됩니다.
            </p>
            <p>
              인생이 항상 탄탄대로이기만 하다면 너무나 좋겠지만, 모든 사람의
              삶이 그럴 수는 없다고 생각합니다. 다만 고난을 겪는 시기가 와도 잘
              이겨낸 뒤, 그 시간들을 되돌아보면서 다시는 그런 경험을 반복하지
              않고자 노력한다면 그걸로도 큰 의미가 있지 않나 생각합니다.
            </p>
            <p>
              저는 20대에 그런 경험을 했고, 이겨냈습니다. 제게는 이제 어떤
              어려운 일이 생겨도 잘 이겨낼 수 있으리란 믿음이 있습니다. 따라서
              쉽게 포기하지 않는 끈질김과 간절함을 가지고 좋은 개발자가 되기
              위해 취업 후에도 쉬지 않고 공부했으며, 현재도 그 노력은 진행중에
              있습니다.
            </p>
          </div>
        </div>
        <div className="history" id="knit">
          <h4>니트패션디자인</h4>
          <div className="txtWrapper">
            <h5>:: 만족도 100%</h5>
            <p>
              꿈에 그리던 패션디자인을 전공으로 삼게 되었습니다. 하지만 공부는
              그리 쉽지 않았습니다. 패션 고등학교를 졸업하고 진학한 친구들이
              더러 있어, 1학년 1학기 때는 굉장히 뒤처지고 있다는 느낌을
              받았습니다. 특히나 처음 써보는 미싱이 너무 어려웠습니다. 따라서
              정규 수업시간만으로는 그 격차를 좁힐 수가 없다고 판단하여,
              드레이핑실의 시간표를 찍어 아침 공강이 있는날마다 일찍 학교에 가
              연습을 했습니다. 그러자 2학기 때부터는 눈에 띄게 실력이 많이
              늘었고, 자신감을 얻어 더 즐겁게 학교를 다닐 수 있었습니다.
            </p>
            <p>
              저는 제 전공을 너무나 사랑했습니다. 여대이고, 예체능 계열인만큼
              시험만 잘 본다하여 좋은 학점을 얻을 수 있는 환경이 아니었지만,
              4.5점 만점에 4.3점으로 졸업을 할만큼 공부도 열심히 했고, 실습도
              열심히 했습니다. 남들은 가장 힘들다는 졸업작품 때도 저는 제가
              기획한 컨셉의, 머리부터 발끝까지 디자인한 착장의 옷을 직접 만들 수
              있다는 점에 희열을 느끼며 힘든 줄도 모르고 학교에서 살다시피하며
              작업을 했습니다. 그럼에도 무언가를 만드는 게 좋아서 방학 때도
              지치지 않고 친구와 함께 학교에 나와, 직접 입을 옷과 가방을
              만들기도 할 정도로 전공에 대한 만족도가 100%인 채로 학교생활을
              했습니다. 또 입시미술을 준비한 적은 없지만 패션 일러스트레이션을
              그리는 것에도 꽤 소질이 있어서 3학년 때는 패션 일러스트레이션
              공모전에서 본상을 수상하기도 했습니다.
            </p>
          </div>
          <div className="txtWrapper">
            <h5>:: 전공을 취미로 삼기까지</h5>
            <p>
              그러나 운이 없었는지 졸업 후 취업한 첫 회사는 악몽과도 같았습니다.
              다른 무엇보다도 매일같이 고함을 지르며 화를 내고, 인성모독을 하며
              싸우고 울던 사람들을 도저히 견딜 수가 없었습니다. 1년도 안되는
              기간이었는데 그렇게 좋아하던 전공에 학을 뗄만큼 정신적으로
              스트레스를 넘어 충격을 많이 받았습니다.
            </p>
            <p>
              그래서 니트와 패션디자인은 더이상 직업으로 삼지 않기로
              결심했습니다. 그렇게나 좋아했고, 그렇게나 열시밓 배웠는데 이렇게
              단 한 번의 경험으로 포기한다는 게 다른 누군가에겐 이해되지 않는
              행동일 수 있습니다. 저 또한 아쉬움이 남지 않았던 것은 아닙니다.
              하지만 그만큼 진심을 다해 열심히 했던 기억 때문인지 생각보다
              미련을 쉽게 떨쳐낼 수 있었습니다. 지금은 그 때의 결정 덕분에
              개발을 할 수 있게 되어 단 일말의 후회도 없습니다.
            </p>
            <p>
              그 대신 전공을 제 평생 취미로 삼기로 했습니다. 작년 11월에는
              니트로 필름카메라 가방을 떠서 매고 제주도에 놀러갔고, 조금 더
              튼튼한 4계절용 카메라 가방을 만들고자 얼마 전 동대문 종합상가에
              들려 필요한 부자재를 사오기도 했습니다. 나중에 독립 후 조금 넓은
              집에 살게 되면, 공업용 미싱을 구매하는 게 소소한 꿈 중에
              하나입니다.
            </p>
          </div>
        </div>
        <div className="history" id="drop">
          <h4>내 인생, 가장 큰 첫 번째 결정</h4>
          <div className="txtWrapper">
            <h5>:: 고등학교를 자퇴하다</h5>
            <p></p>
          </div>
        </div>
      </Wrapper>
    </Post>
  );
};
export default History;
