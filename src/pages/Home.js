import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import Sidebar from '../components/Layout/Sidebar';
import Content from '../components/Layout/Content';
import Card from '../components/Layout/Card';
import {
  MdLink,
  MdMailOutline,
  MdLocationOn,
  MdPhoneIphone,
} from 'react-icons/md';
import { publicUrl } from '../utils/utils';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ContentSection = styled.section`
  height: fit-content !important;
  h2 {
    padding: 5px;
    margin-bottom: 10px;
    font-weight: bold;
    color: ${props => props.theme.mainColor.color};
  }
  &:first-of-type {
    h2 {
      margin-bottom: 5px;
    }
    div {
      width: 100%;
      min-height: 200px;
      img {
        width: 100%;
      }
    }
  }
  &:last-of-type {
    margin-top: 20px;
    h2 {
      margin-bottom: 15px;
      border-bottom: 2px solid #eee;
    }
  }
  ul {
    line-height: 1.8;
    li {
      height: 30px;
      border-bottom: 1px dashed #a5a5a5;
    }
  }
`;

const ProfileSection = styled.section`
  height: fit-content !important;
  &:last-of-type {
    padding: 10px 0;
    border-top: 1px dashed #a5a5a5;
    p {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    svg {
      margin-right: 3px;
      color: #666;
    }
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  .my-name {
    margin-right: 5px;
    color: ${props => props.theme.mainColor.color};
    font-size: 1rem;
    font-weight: bold;
  }
  .my-sex,
  .my-brthdy {
    color: #9e9e9e;
    font-size: 0.85rem;
  }
  .my-sex {
    margin-right: 2px;
    font-size: 0.8rem;
  }
`;

const LinkTitle = styled.p`
  display: flex;
  align-items: center;
  margin: 10px 0;
  &:first-of-type {
    margin-top: 20px;
  }
  &:last-of-type {
    margin-bottom: 20px;
  }
  cursor: pointer;
  svg {
    margin-right: 5px;
    color: #666;
    font-size: 1.2rem;
  }
  &:hover {
    color: ${props => props.theme.mainColor.color};
  }
`;

const Home = () => {
  const goGithub = () => {
    window.location.href = 'https://github.com/danbiilee/react-miniportfoly';
  };
  const goVelog = () => {
    window.location.href = 'https://velog.io/@dblee';
  };

  return (
    <Layout>
      <Sidebar>
        <Card>
          <FlexWrapper>
            <ProfileSection>
              <img src={publicUrl + '/resources/img/memo_.jpg'} alt="profile" />
              <LinkTitle onClick={goGithub}>
                <MdLink />
                Github
              </LinkTitle>
              <LinkTitle onClick={goVelog}>
                <MdLink />
                dblee.log
              </LinkTitle>
            </ProfileSection>
            <ProfileSection>
              <p>
                <span className="my-name">이단비</span>
                <span className="my-sex">(♀)</span>
                <span className="my-brthdy">1992.08.19</span>
              </p>
              <p>
                <MdMailOutline />
                danbi.db@gmail.com
              </p>
              <p>
                <MdPhoneIphone />
                010-4013-4147
              </p>
              <p>
                <MdLocationOn />
                경기도 안양시
              </p>
            </ProfileSection>
          </FlexWrapper>
        </Card>
      </Sidebar>
      <Content>
        <Card>
          <ContentSection>
            <h2>미니룸</h2>
            <div>
              <img
                src={publicUrl + '/resources/img/miniroom.gif'}
                alt="miniroom"
              />
            </div>
          </ContentSection>
          <ContentSection>
            <h2>한 줄 감성</h2>
            <ul>
              <li>싸이월드 미니홈피 감성으로 기획, 개발했습니다~☆</li>
              <li>프로필 페이지를 구경해주세요~☆</li>
              <li>배경도 바꿀 수 있답니다~☆</li>
              <li></li>
              <li></li>
            </ul>
          </ContentSection>
        </Card>
      </Content>
    </Layout>
  );
};
export default Home;
