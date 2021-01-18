import React from 'react';
import styled from 'styled-components';
import Post from '../../../components/Layout/Post';

const Wrapper = styled.div`
  padding: 40px;
  .wrapper {
    margin-top: 40px;
    &:first-of-type {
      margin-top: 0;
    }
  }
  h4 {
    color: #238db3;
    font-weight: bold;
    font-size: 1.2rem;
  }
  p,
  ul {
    margin: 10px 0;
    line-height: 20px;
  }
  li {
    margin: 5px 0;
  }
`;

const Qna = ({ title }) => {
  return (
    <Post>
      <h3>{title}</h3>
      <div className="post-info">
        <p>이단비</p>
        <p>2021-01-05</p>
      </div>
      <Wrapper>
        <div className="wrapper">
          <h4>:: 평소 기상시간, 취침시간</h4>
          <p>
            평일 기준 5시 10분, 12시. 근데 요즘 기상시간이 점점 늦어지고 있다.
            피곤해ㅠㅠ
          </p>
        </div>
        <div className="wrapper">
          <h4>:: 최장, 최단 수면시간</h4>
          <p>하루종일 잘 수 있다, 하루종일 깨어있을 수 있다.</p>
        </div>
        <div className="wrapper">
          <h4>:: 내가 좋아하는 계절, 시간대?</h4>
          <p>겨울, 새벽.</p>
        </div>
        <div className="wrapper">
          <h4>:: 내가 꾸준히 모으는 물건은?</h4>
          <p>스노우볼.</p>
        </div>
        <div className="wrapper">
          <h4>:: 요즘 즐겨하는 취미</h4>
          <p>필름카메라 찍기.</p>
        </div>
        <div className="wrapper">
          <h4>:: 지금 가고 싶은 여행지는?</h4>
          <p>태국!!!!! 가서 바트 펑펑 쓰고 1일 2마사지 받고 시퍼유😭... </p>
        </div>
        <div className="wrapper">
          <h4>:: 가장 기억 남는 여행</h4>
          <p>
            가장 기억에 남기 보단 이상하게 요즘 말레이시아에서 버스 타고
            이동하던 때의 기억이 자주 떠오른다. 아니면 택시에서 듣던 노래들이나.
            그 때 그 분위기들, 왠지 자꾸 생각나.
          </p>
        </div>
        <div className="wrapper">
          <h4>:: 가장 기억 남는 영화</h4>
          <p>가장 최근에 본, 트라이얼 오브 더 시카고 7</p>
        </div>
        <div className="wrapper">
          <h4>:: 가장 잘 입는 옷 스타일</h4>
          <p>셔츠에 편한 바지. 아니면 편한 치마.</p>
        </div>
        <div className="wrapper">
          <h4>:: 가장 좋아하는 노래</h4>
          <p>
            최근에 가장 좋아하던 노래는 애쉬 아일랜드의 악몽, 웨이체드의 Why do
            u say
          </p>
        </div>
        <div className="wrapper">
          <h4>:: 좋아하는 가수</h4>
          <p>
            넘 많아... 못 골라.. Music is My life요.... 하지만 요즘 내 원픽은
            애쉬 아일랜드🙊👍
          </p>
        </div>
        <div className="wrapper">
          <h4>:: 내가 가장 열렬하게 덕질했던 대상은?</h4>
          <p>딱 3명만 꼽자면ㅋㅋㅋㅋㅋㅋ 권지용, 박재범, 변백현입니다. 하하.</p>
        </div>
        <div className="wrapper">
          <h4>:: 가장 최근에 읽은 책은?</h4>
          <p>인사이드 자바스크립트.</p>
        </div>
        <div className="wrapper">
          <h4>:: 감명깊게 읽은 책</h4>
          <p>Flipped.</p>
        </div>
        <div className="wrapper">
          <h4>:: 내가 태어나서 가장 열정적으로 배운 것은?</h4>
          <p>개발, 니트디자인.</p>
        </div>
        <div className="wrapper">
          <h4>:: 우울할 때 하는 행동은?</h4>
          <p>웃긴 영상 찾아보기, 귀여운 짤 찾아보기.</p>
        </div>
        <div className="wrapper">
          <h4>:: 내가 유튜브에서 주로 찾아보는 영상의 종류는?</h4>
          <p>가수 라이브 영상.</p>
        </div>
        <div className="wrapper">
          <h4>:: 핸드폰에서 자주하는 어플 세 가지는?</h4>
          <p>지도 어플, 유튜브(유튜브 뮤직), 네이버웹툰.</p>
        </div>
        <div className="wrapper">
          <h4>:: 내가 원하는 내 인생의 마무리는?</h4>
          <p>병으로 고생하지 않고 편히 죽는 것.</p>
        </div>
        <div className="wrapper">
          <h4>:: 삶의 질을 높여준 2개의 제품은?</h4>
          <p>유튜브 프리미엄, 삼성페이.</p>
        </div>
        <div className="wrapper">
          <h4>:: 조건없이 초능력을 가진다면 어떤 초능력을 가질 것인가?</h4>
          <p>원하는 곳으로 곧장 이동할 수 있는 능력.</p>
        </div>
        <div className="wrapper">
          <h4>:: 집에 방이 하나 더 생긴다면 무엇을 하고 싶은지?</h4>
          <p>
            100% 방음되는 방을 만들어서 코인노래방을 만들고, 피아노를 사서 놓고,
            홈시어터를 설치하고 싶다.
          </p>
        </div>
        <div className="wrapper">
          <h4>:: 제일 친한 친구랑 어떻게 알게 되었나?</h4>
          <p>중1 때 같은 반이었다.</p>
        </div>
        <div className="wrapper">
          <h4>:: 가장 꼴불견이라고 생각하는 사람</h4>
          <p>자기만 특별한 줄 아는 사람.</p>
        </div>
        <div className="wrapper">
          <h4>:: 가족을 제외하고 내 인생에서 가장 영향력 있던 사람은?</h4>
          <p>타비 게빈슨.</p>
        </div>
        <div className="wrapper">
          <h4>
            :: 살면서 놓쳤던 인연들 중 한 명을 다시 잡을 수 있다면 누구를 잡을
            것인가?
          </h4>
          <p>
            함께 영화 이야기를 가장 많이했고, 취향이 가장 비슷해서 대화가 끊길
            틈이 없던 그 친구.
          </p>
        </div>
      </Wrapper>
    </Post>
  );
};

export default Qna;
