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
import FormWrapper from './FormWrapper';
import * as apiSessions from '../../api/sessions';
import { setFormMode } from '../../module/formMode';
import { getBoardsAll } from '../../module/boards';
import { getBoards } from '../../api/boards';

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
  console.log('diary');
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

  // Get boards
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.boards.boards);
  console.log(loading, data, error);

  // useEffect(() => {
  //   dispatch(getBoardsAll());
  // }, [dispatch]);
  getBoards();

  // Check & Set regusr/passwd
  const [passwd, setPasswd] = useState('');
  const [regusr, setRegusr] = useState('');
  const handleRegInfo = e => {
    const { name, value } = e.target;
    if (name === 'passwd') setPasswd(value);
    else setRegusr(value);
  };

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setPasswd('');
    setRegusr('');
    setIsOpen(!isOpen);
  };

  // Mode type: view, form
  const { formMode: isForm } = useSelector(state => state);
  const handleMode = () => {
    // if you try to change mode type to form, (false -> true)
    // check passwd & enter regusr
    if (!isForm) {
      if (!regusr) {
        alert('등록자명을 입력해주세요!');
        return;
      }
      if (!passwd) {
        alert('비밀번호를 입력해주세요!');
        return;
      }
      apiSessions
        .getPasswd()
        .then(data => {
          if (data.passwd !== passwd) {
            alert('유효하지 않은 비밀번호입니다!');
            return;
          } else {
            dispatch(setFormMode(!isForm));
            handleModal();
          }
        })
        .catch(err => alert('비밀번호 불러오기 실패!'));
    } else {
      dispatch(setFormMode(!isForm));
    }
  };

  return (
    <Layout>
      <Modal isOpen={isOpen} width={500} height={300} bg="salmon">
        <h4>✔ 비밀번호 확인</h4>
        <input
          type="text"
          name="regusr"
          value={regusr}
          placeholder="등록자명을 입력하세요"
          onChange={handleRegInfo}
        />
        <input
          type="password"
          name="passwd"
          value={passwd}
          onChange={handleRegInfo}
        />
        <ButtonWrapper>
          <button type="button" onClick={handleModal}>
            닫기
          </button>
          <button type="button" onClick={handleMode}>
            적용하기
          </button>
        </ButtonWrapper>
      </Modal>
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
                {!isForm ? (
                  <>
                    <Button type="button" onClick={handleModal}>
                      등록하기
                    </Button>
                    <Post>
                      <h3>다이어리 메인</h3>
                      <div className="post-info">
                        <p>이단비</p>
                        <p>2020-11-12</p>
                      </div>
                      <div className="post-contents">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            '/resources/img/profile.jpg'
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
                            process.env.PUBLIC_URL +
                            '/resources/img/profile.jpg'
                          }
                          alt="profile"
                        />
                        <p>모든 글 전체 조회?</p>
                      </div>
                    </Post>
                  </>
                ) : (
                  <FormWrapper regusr={regusr} passwd={passwd} />
                )}
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
