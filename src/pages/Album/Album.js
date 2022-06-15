import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/Layout/Card';
import SubMenu from '../../components/Menu/SubMenu';
import Sidebar from '../../components/Layout/Sidebar';
import Content from '../../components/Layout/Content';
import { Best, Worst } from './Jeju';

const Album = () => {
  const match = useRouteMatch();
  const list = [
    {
      id: 1,
      title: '2022.05 제주도',
      url: '/jeju',
      child: [
        { id: 1, title: '감성', url: '/' },
        { id: 3, title: '망한 사진 모음', url: '/worst' },
      ],
    },
  ];

  return (
    <Layout>
      <Sidebar>
        <Card>
          <SubMenu title="Album" list={list} />
        </Card>
      </Sidebar>
      <Content>
        <Card>
          <Switch>
            <Route exact path={`${match.path}`} component={Best} />
            <Route exact path={`${match.path}/jeju`} component={Best} />
            <Route path={`${match.path}/jeju/:type`} component={Worst} />
          </Switch>
        </Card>
      </Content>
    </Layout>
  );
};

export default Album;
