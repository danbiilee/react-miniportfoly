import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout/Layout';
import Sidebar from '../components/Layout/Sidebar';
import Content from '../components/Layout/Content';
import Card from '../components/Layout/Card';
import MainMenu from '../components/Menu/MainMenu';

// section in Content
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
  &:first-of-type {
    p:first-of-type {
      margin-top: 10px;
    }
  }
  &:last-of-type {
    border-top: 1px dashed gray;
  }
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const Home = () => {
  return (
    <Layout>
      <Sidebar>
        <Card>
          <ProfileSection>
            <img
              src={process.env.PUBLIC_URL + 'resources/img/profile.jpg'}
              alt="profile"
            />
            <p>주니어 개발자</p>
            <p>
              HTML5, CSS3, SCSS, JS, REACT, VUE, NODE, MONGODB, JAVA, ORACLE,
              MYSQL, GIT
            </p>
          </ProfileSection>
          <ProfileSection>
            <p>
              이단비 <span>(♀) 1992.08.19</span>
            </p>
            <p>danbi.db@gmail.com</p>
            <p>https://github.com/danbiilee</p>
            <p>010-4013-4147</p>
            <p>경기도 안양시</p>
          </ProfileSection>
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
