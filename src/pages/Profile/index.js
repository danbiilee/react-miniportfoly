import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Layout/Card';
import SubMenu from '../../components/Menu/SubMenu';
import Sidebar from '../../components/Layout/Sidebar';
import Content from '../../components/Layout/Content';
import Post from '../../components/Layout/Post';

const PostWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 0 20px;
`;

const Profile = () => {
  const match = useRouteMatch();
  const list = [
    {
      id: 1,
      title: '👩‍💻내 소개',
      url: '/intro',
      child: [
        { id: 1, title: '소개', url: '/aboutMe' },
        { id: 2, title: '키워드', url: '/keyword' },
        { id: 3, title: '히스토리', url: '/history' },
        { id: 4, title: '기본정보', url: '/info' },
      ],
    },
    {
      id: 2,
      title: '👭내 인맥',
      url: '/people',
    },
    {
      id: 3,
      title: '⭐내 즐겨찾기',
      url: '/favorite',
      child: [{ id: 1, title: '링크', url: '/link' }],
    },
  ];

  return (
    <Layout>
      <Sidebar>
        <Card>
          <SubMenu title="Profile" list={list} />
        </Card>
      </Sidebar>
      <Content>
        <Card>
          <PostWrapper>
            <Switch>
              <Route exact path={match.path}>
                <>
                  <Post>
                    <h3>프로필 메인</h3>
                    <div className="post-info">
                      <p>이단비</p>
                      <p>2020-11-12</p>
                    </div>
                    <div className="post-contents">
                      <img
                        src={
                          process.env.PUBLIC_URL + '/resources/img/profile.jpg'
                        }
                        alt="profile"
                      />
                      <p>모든 글 전체 조회?</p>
                    </div>
                  </Post>
                  <Post>
                    <h3>다이어리 메인</h3>
                    <div className="post-info">
                      <p>이단비</p>
                      <p>2020-11-12</p>
                    </div>
                    <div className="post-contents">
                      <img
                        src={
                          process.env.PUBLIC_URL + '/resources/img/profile.jpg'
                        }
                        alt="profile"
                      />
                      <p>모든 글 전체 조회?</p>
                    </div>
                  </Post>
                </>
              </Route>
              <Route path={`${match.path}/intro`}>내 소개</Route>
              <Route exact path={`${match.path}/intro/aboutMe`}>
                소개
              </Route>
              <Route exact path={`${match.path}/intro/keyword`}>
                키워드
              </Route>
              <Route exact path={`${match.path}/intro/history`}>
                히스토리
              </Route>
              <Route exact path={`${match.path}/intro/info`}>
                기본정보
              </Route>
            </Switch>
          </PostWrapper>
        </Card>
      </Content>
    </Layout>
  );
};

export default Profile;
