import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Content from '../../components/Layout/Content';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Layout/Sidebar';
import Card from '../../components/Layout/Card';
import MainMenu from '../../components/Menu/MainMenu';
import SubMenu from '../../components/Menu/SubMenu';
import ChangeTheme from './ChangeTheme';
import TasklistWrapper from './Tasklist';

const IndexWrapper = styled.div`
  display: flex;
  img {
    width: 50%;
  }
  p {
    writing-mode: vertical-rl;
  }
`;

const Workbox = () => {
  const match = useRouteMatch();
  const list = [
    { id: 1, title: '🎨테마 변경하기', url: '/changeTheme' },
    { id: 2, title: '✅업무리스트', url: '/tasklist' },
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
                <p>재미난 거 만드는 법</p>
                <p>첫 번째. 참신한 아이디어 떠올리기</p>
                <p>두 번째. 구현할 수 있는 능력 보유하기</p>
                <p>세 번째. 뚝딱뚝..따..ㄱ..ㅇ..뚱땅 만들기</p>
              </IndexWrapper>
            </Route>
            <Route path={`${match.path}/changeTheme`}>
              <ChangeTheme />
            </Route>
            <Route path={`${match.path}/tasklist`}>
              <TasklistWrapper />
            </Route>
          </Switch>
        </Card>
      </Content>
      <MainMenu />
    </Layout>
  );
};

export default Workbox;
