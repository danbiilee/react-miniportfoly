import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import Content from '../../components/Layout/Content';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Layout/Sidebar';
import Card from '../../components/Layout/Card';
import MainMenu from '../../components/Menu/MainMenu';
import SubMenu from '../../components/Menu/SubMenu';
import ChangeTheme from './ChangeTheme';
import TasklistWrapper from './Tasklist';

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
              <Index />
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

const Index = () => {
  return <div>워크박스 인덱스</div>;
};

export default Workbox;
