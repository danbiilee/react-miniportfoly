import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Layout/Card';
import SubMenu from '../../components/Menu/SubMenu';
import Sidebar from '../../components/Layout/Sidebar';
import Content from '../../components/Layout/Content';
import Post from '../../components/Layout/Post';
import Modal from '../../components/Modal/Modal';

const PostWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 0 20px;
`;

const Button = styled.button`
  float: right;
  margin: 0 10px 10px 0;
`;

// Modal
const ButtonWrapper = styled.div``;

const Diary = () => {
  const match = useRouteMatch();
  const list = [
    { id: 1, title: '📁작업일지', url: '/workLog' },
    {
      id: 2,
      title: '📁공부노트',
      url: '/study',
      child: [
        { id: 1, title: '📝리액트', url: '/react' },
        { id: 2, title: '📝자바스크립트', url: '/js' },
      ],
    },
  ];

  return (
    <Layout>
      <Sidebar>
        <Card>
          <SubMenu title="다이어리" list={list} />
        </Card>
      </Sidebar>
      <Content>
        <Card>
          <PostWrapper>
            <Switch>
              <Route exact path={match.path}>
                <>
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
              <Route path={`${match.path}/workLog`}>작업일지</Route>
              <Route exact path={`${match.path}/study`}>
                스터디 메인
              </Route>
              <Route path={`${match.path}/study/react`}>스터디 리액트</Route>
              <Route path={`${match.path}/study/js`}>스터디 자바스크립트</Route>
            </Switch>
          </PostWrapper>
        </Card>
      </Content>
    </Layout>
  );
};

export default Diary;
