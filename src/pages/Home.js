import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import Sidebar from '../components/Layout/Sidebar';
import Content from '../components/Layout/Content';
import Card from '../components/Layout/Card';
import MainMenu from '../components/Menu/MainMenu';
import { MdLink, MdMailOutline, MdLocationOn, MdPhoneIphone } from 'react-icons/md';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ContentSection = styled.section`
  height: fit-content !important;
  h2 {
    margin-bottom: 10px;
    font-weight: bold;
    color: ${props => props.theme.layout.mainColor};
  }
  &:first-of-type {
    div {
      width: 100%;
      height: 250px;
      background: lightblue;
      border: 1px solid gray;
    }
  }
  &:last-of-type {
    h2 {
      border-bottom: 1px dashed gray;
      line-height: 1.4;
    }
    div {
      margin-bottom: 10px;
    }
  }
  ul {
    line-height: 1.8;
    li {
      height: 30px;
      border-bottom: 1px dashed gray;
    }
  }
`;

const ProfileSection = styled.section`
  height: fit-content !important;
  &:last-of-type {
    padding-top: 20px;
    border-top: 1px dashed gray;
    //font-size: 0.9rem;
    p {
      display: flex;
      align-items: center;
      &:not(:first-of-type) {
        margin: 10px 0;
      }
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
    color: ${props => props.theme.layout.mainColor};
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
  margin: 20px 0;
  cursor: pointer;
  svg {
    margin-right: 5px;
    color: #666;
    font-size: 1.2rem;
  }
  &:hover {
    color: ${props => props.theme.layout.mainColor};
  }
`;

const Home = () => {
  const goGithub = () => {
    window.location.href = 'https://github.com/danbiilee';
  };

  return (
    <Layout>
      <Sidebar>
        <Card>
          <FlexWrapper>
            <ProfileSection>
              <img
                src={process.env.PUBLIC_URL + '/resources/img/profile.jpg'}
                alt="profile"
              />
              <LinkTitle onClick={goGithub}><MdLink />Github</LinkTitle>
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
            <div>준비중</div>
          </ContentSection>
          <ContentSection>
            <h2>한 줄 이력</h2>
            <div>
              <ul>
                <li>KH 수료</li>
                <li>소프트원 재직중</li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </ContentSection>
        </Card>
      </Content>
      <MainMenu />
    </Layout>
  );
};
export default Home;
