import React from 'react';
import ScrollToTop from '../../../components/Layout/ScrollToTop';
import Main from './Main';
import Info from './Info';
import AboutMe from './AboutMe';
import Skills from './Skills';
import History from './History';

const Intro = ({ match }) => {
  let { type } = match.params;
  type = type ? type : 'main';

  const intros = [
    {
      type: 'main',
      component: <Main />,
    },
    {
      type: 'info',
      component: <Info title="기본정보" />,
    },
    {
      type: 'aboutMe',
      component: <AboutMe title="소개" />,
    },
    {
      type: 'skills',
      component: <Skills title="기술" />,
    },
    {
      type: 'history',
      component: <History title="히스토리" />,
    },
  ];
  const { component } = intros.find(item => item.type === type);

  return <ScrollToTop path={type}>{component}</ScrollToTop>;
};

export default Intro;
