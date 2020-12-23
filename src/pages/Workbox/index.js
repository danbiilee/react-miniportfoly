import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Content from '../../components/Layout/Content';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Layout/Sidebar';
import Card from '../../components/Layout/Card';
import SubMenu from '../../components/Menu/SubMenu';
import ChangeTheme from './ChangeTheme';
import TasklistWrapper from './Tasklist';
import PhotoEditor from './PhotoEditor';

const IndexWrapper = styled.div`
  display: flex;
  padding: 50px;
  border: 50px solid #eeeeeeb8;
  font-family: 'Black Han Sans', sans-serif;
  img {
    width: 50%;
    margin-right: 50px;
  }
  h3,
  p {
    writing-mode: vertical-rl;
  }
  h3 {
    height: fit-content;
    margin-right: 20px;
    padding: 10px 5px;
    background: #000;
    color: #fff;
    font-size: 2.5rem;
  }
  p {
    line-height: 1.6;
    font-size: 2rem;
  }
  span {
    color: #666;
    font-family: 'Kirang Haerang', cursive;
    font-size: 2.3rem;
    text-decoration: underline;
  }
`;

const Workbox = () => {
  const match = useRouteMatch();
  const list = [
    { id: 1, title: '🎨 테마 변경하기', url: '/changeTheme' },
    { id: 2, title: '✅ 업무리스트', url: '/tasklist' },
    { id: 3, title: '🖼 사진을 꾸며봐요', url: '/photoEditor' },
  ];

  return (
    <Layout>
      <Sidebar>
        <Card>
          <SubMenu title="워크박스" list={list} />
        </Card>
      </Sidebar>
      <Content>
        <Card>
          <Switch>
            <Route exact path={match.path}>
              <IndexWrapper>
                <img
                  src={
                    process.env.PUBLIC_URL + '/resources/img/workbox-main.svg'
                  }
                  alt="Workbox Main"
                />
                <h3>토이프로젝트 하는 방법</h3>
                <p>
                  첫 번째 <span>참신</span>한 아이디어 떠올리기
                </p>
                <p>
                  두 번째 <span>뚱땅뚱땅</span> 만들기
                </p>
                <p>
                  세 번째 <span>삽질</span>하기
                </p>
                <p>
                  네 번째 <span>뚱땅뚱땅</span> 만들기
                </p>
                <p>
                  다섯 번째 <span>삽질</span>하기
                </p>
                <p>...</p>
              </IndexWrapper>
            </Route>
            <Route path={`${match.path}/changeTheme`}>
              <ChangeTheme />
            </Route>
            <Route path={`${match.path}/tasklist`}>
              <TasklistWrapper />
            </Route>
            <Route path={`${match.path}/photoEditor`}>
              <PhotoEditor />
            </Route>
          </Switch>
        </Card>
      </Content>
    </Layout>
  );
};

export default Workbox;
