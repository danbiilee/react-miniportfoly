import React from 'react';
import styled from 'styled-components';
import Post from '../../../components/Layout/Post';

const Wrapper = styled.div`
  padding: 40px;
  .about {
    margin-top: 60px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  h4 {
    margin-bottom: 20px;
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

const AboutMe = ({ title }) => {
  return (
    <Post>
      <h3>{title}</h3>
      <div className="post-info">
        <p>이단비</p>
        <p>2021-01-05</p>
      </div>
      <Wrapper>
        <div className="about">
          <h4>저를 소개합니다</h4>
          <div className="txtWrapper">
            <p>
              안녕하세요. 저는 백엔드 개발자였다가 곧 프론트엔드 개발자가 될
              예정인, 주니어 개발자 이단비입니다. 현재는 여러 이유로 잠시 자유의
              몸이 되었으나, 작년까지는 소프트원에서 자바, 오라클, vue.js 등을
              사용하여 가습기살균제 피해자들을 위한 건강모니터링 시스템 개발을
              했습니다.
            </p>
            <p>
              프로젝트의 뼈대밖에 없던 4월부터 10월에 사이트가 첫 오픈을
              하기까지의 시간 동안 처음으로 vue.js를 사용해보면서 자바, DB,
              서버에 관한 작업보다는 코드의 결과물이 가시적으로 나타나는
              클라이언트단에서의 개발이 더 재밌다고 느꼈습니다.
            </p>
            <p>
              저는 기왕이면 `더 재밌고, 더 잘 할 수 있는 걸 하자`는 주의이므로,
              이제 프론트엔드 개발자가 되려 합니다!
            </p>
          </div>
        </div>
        <div className="about">
          <h4>나란 사람은?</h4>
          <div className="txtWrapper">
            <h5>:: 정신 차려보니 노력파!</h5>
            <p>
              저는 욕심이 많은 편입니다. 제가 잘 하고 싶은 것은 반드시 잘 하게
              되어야만 만족을 합니다. 그런 저에게 지금 가장 잘 하고 싶은 것이
              뭐냐고 묻는다면 첫 째도 코딩, 둘 째도 코딩, 셋 째도 코딩입니다.
              하지만 애석하게도 저는 타고난 개발자는 아닙니다. 학창시절엔 흔히
              말하는 수포자였고, 평생을 프로그래밍과는 관련 없는 것들만 보고
              들으며 지내왔기에 공부를 하면서도, 업무를 하면서도 어려움을 많이
              느끼고 가끔은 좌절하기도 합니다. 주위에 개발을 잘하는 사람들은
              너무나 많고, 앞으로는 더 많아지리라 생각하면서 제 미래를 걱정기도
              합니다.
            </p>
            <p>
              그렇지만 저는 포기하지 않겠다고 다짐했습니다. 그렇게 부정적인
              생각만 하거나 끝없이 남들과 비교하기 보다는 일단 노력하고 보는
              전략을 택하기로 했습니다. 그 예로 KH정보교육원에 다닐 때는 숙제와
              복습을 하루도 거르지 않았으며, 프로젝트 기간에는 하루 평균 3시간을
              자면서 몰두했습니다. 그 결과 반복문도 잘 모르던 생초보에서 반에서
              유일하게 성적우수상을 수여하는 우수한 학생이 되었고, 면접에서도 그
              성실함을 인정받아 수료와 동시에 취업을 하게 되는 쾌거를
              이루었습니다. 또한 소프트원에 입사 약 한 달 뒤부터는 아침 7시
              30분에 출근해 업무 시작 전까지, 또 퇴근 후 9시까지 카페에서 개인
              공부를 하며 부족함을 채우려 노력했습니다.
            </p>
            <p>
              무식하다고 할 수도 있습니다. 하지만 언젠가는 이 노력, 간절함,
              시간들이 모이고 모여, 제가 크게 성장할 수 있는 발판이 되리라
              믿으며 앞으로도 지치지 않고 끝까지 노력하는 것이 제 목표입니다.
            </p>
          </div>
        </div>
        <div className="about">
          <h4>장점, 그리고 단점</h4>
          <div className="txtWrapper">
            <h5>:: 열 번 검사해도 언제나 J, 계획파</h5>
            <p>
              저는 MBTI를 검사하면 열이면 열, J가 나오는 정리하고 계획 세우는 걸
              좋아하는 성격을 가지고 있습니다. 제 컴퓨터 노트패드에는 일자 별로
              정리한 그 날의 할 일들이 빼곡히 정리되어있습니다. 매일 아침마다
              하루를 시작하면서, 매일 퇴근 전에 하루를 마무리하면서 목록을
              정리하곤 합니다. 이렇게 습관적으로 기록하고, 계획을 세우는 것이
              아무리 바쁘고 정신 없어도 사소한 실수를 줄이고 차분한 마음으로
              일에 열중할 수 있도록 도와주는 요소라고 생각합니다.
            </p>
          </div>
          <div className="txtWrapper">
            <h5>:: 신중한 겁보</h5>
            <p>
              또 저는 지나친 돌다리도 다시 한 번 두들겨보는 취미를 가지고
              있습니다. 문제 없다고 생각했던 코드에서, 전혀 생각지도 못한 버그가
              튀어나오는 경험을 해본 적이 있습니다. 특히나 그걸 이미 서버에
              반영한 후에 발견했을 땐, 등골이 서늘해지고 땀이 삐질 나던 기억이
              납니다. 그런 경험을 할 때마다 더 열심히 콘솔.로그를
              찍어보아야겠다는 다짐을 하곤 합니다.
            </p>
            <p>
              하지만 종종 본디 겁이 많고, 경험과 지식 부족으로 인한 탓인지
              지나치게 사소한 부분에도 시간을 잡고 있는 경우가 있어 스스로가
              답답하게 느껴질 때도 있습니다. 그러나 지금과 반 년 전, 1년 전을
              비교 했을 때 정말 몰라보게 실력이 향상됨을 몸소 체감한 바,
              앞으로도 실력 향상을 위해 많은 시간을 쏟으면, 이 부분은 자연스럽게
              개선되리라 믿습니다.
            </p>
          </div>
        </div>
        <div className="about">
          <h4>목표, 꿈, 이상향</h4>
          <div className="txtWrapper">
            <h5>:: 공유하는 개발자</h5>
            <p>
              본인의 작업물을 다수와 공유하는, 그리고 그걸 부끄러워하지 않는
              개발자가 되고 싶습니다. 단순히 사담을 적은 글에서부터 개발 관련
              글, 개발 코드, 당장은 어디에도 쓸모없어 보이는 토이프로젝트 등...
              그렇게 본인을 다른 개발자들에게 드러냄으로써 다양한 의견을 접할 수
              있게 될 것이고, 그것이 실력 향상의 밑받침이 될 것이며, 결국 본인의
              작업물에 자신감을 갖게 할 것이라 생각합니다.
            </p>
            <p>
              또 세상에 많고 많은 괴물같은 개발자들의 작업물들을 보며 끝없이
              자극받으면서 동시에 저 또한 다른 사람들의 귀감이 될 수 있는
              개발자가 되고 싶습니다.
            </p>
          </div>
          <div className="txtWrapper">
            <h5>:: 여유로운 사람</h5>
            <p>
              마음이 여유로운 사람이 되고 싶습니다. 그래서 주위를 살피며 곤경에
              처한 사람들에게 기꺼이 대가없이 도움의 손길을 내밀 수 있는 사람이
              되고 싶습니다.
            </p>
            <p>
              한편 남들과 비교하며, 그들이 그렇게 하기 때문에 그것이 당연한 줄
              알며 사는 것은 저와 맞지 않습니다. 소신을 가지고, 저에게 가장 맞는
              방식의 삶을 살고 싶습니다. 그러기 위해선 어떠한 상황에서도
              본인만의 여유를 갖는 것이 중요하다고 생각합니다. 그런 의미에서
              개발자는 비교적 주위 상황에 휘둘리지 않고 각기 다른 개인의
              성향들을 장점으로 살려 의미있는 결과물을 만들어낼 수 있는 몇
              안되는 직업이라 생각합니다.
            </p>
            <p>
              그렇기 때문에 개발자는 제 천직이라 생각합니다. 5년 뒤에는 공유가
              몸에 밴 개발자, 10년 뒤에는 보다 여유로운 개발자가 되기를 바라며
              오늘도 열심히 개발에 매진하겠습니다.
            </p>
          </div>
        </div>
      </Wrapper>
    </Post>
  );
};

export default AboutMe;
