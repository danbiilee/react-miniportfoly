import React from 'react';
import ScrollToTop from '../../../components/Layout/ScrollToTop';
import Main from './Main';
import Info from './Info';
import Dev from './Dev';
import Qna from './Qna';

const Intro = ({ match }) => {
  let { type } = match.params;
  type = type ? type : 'main';

  const intros = [
    {
      type: 'main',
      component: <Main />,
    },
    {
      type: 'default',
      component: <Info title="기본정보" />,
    },
    {
      type: 'dev',
      component: <Dev title="기술 및 히스토리" />,
    },
    {
      type: 'qna',
      component: <Qna title="TMI 자문자답" />,
    },
  ];
  const { component } = intros.find(item => item.type === type);

  return <ScrollToTop path={type}>{component}</ScrollToTop>;
};

export default Intro;
