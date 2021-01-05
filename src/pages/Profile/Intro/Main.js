import React from 'react';
import styled from 'styled-components';
import { publicUrl } from '../../../utils/utils';

const Wrapper = styled.div`
  padding: 10px 0;
  font-family: serif;
  font-weight: bold;
  img {
    width: 100%;
    margin: 5px 0;
  }
  h2 {
    color: #a7a7a7;
    font-size: 1.2rem;
  }
  .at {
    color: #cec6a0;
    font-size: 0.9rem;
  }
  .warn {
    text-align: right;
    color: #d9d9d9;
    text-decoration: line-through;
    font-weight: bold;
    font-size: 0.85rem;
    font-style: italic;
  }
`;

const TxtWrapper = styled.div`
  padding: 40px;
  text-align: center;
  .txt {
    margin-bottom: 20px;
    color: #333;
    font-weight: normal;
  }
`;

const Main = () => {
  return (
    <Wrapper>
      <h2>danbilee::</h2>
      <p className="at">2020.10.30_Bumgye_DarakBang::</p>
      <img src={publicUrl + '/resources/img/aboutMe.JPG'} alt="selfie" />
      <p className="warn">눈뽕주의::감성주의::</p>
      <TxtWrapper>
        <p className="txt">"나를 봐."</p>
        <p className="txt">"그게 뭔데."</p>
        <p className="txt">"내 눈을 바라 봐."</p>
        <p className="txt">"그거 어떻게 하는 건데."</p>
      </TxtWrapper>
    </Wrapper>
  );
};

export default Main;
