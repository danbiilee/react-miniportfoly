import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { TiPlus, TiTimes } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { addTasklist } from '../../../module/tasklists';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 44px;
  padding: 10px;
  margin-right: 10px;
`;

const ViewWrapper = styled(Wrapper)`
  background: ${props => props.theme.layoutBg2.color};
  color: #454545;
  &:hover {
    background: ${props => props.theme.mainColor.color};
    color: #fff;
  }
  font-weight: bold;
  cursor: pointer;
  h4 {
    width: 70%;
    margin-left: 5px;
    font-size: 0.9rem;
  }
`;

const FormWrapper = styled(Wrapper)`
  background: ${props => props.theme.layoutBg1.color};
  color: #454545;
`;

const Input = styled.input`
  width: 75%;
  padding: 3px 7px;
  border: 2px solid ${props => props.theme.mainColor.color};
  border-radius: 3px;
  outline: 0;
`;

const HeaderBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 25%;
  font-size: 1.2rem;
  svg {
    margin-left: 8px;
    font-size: 1.3rem;
    &:last-of-type {
      font-size: 1.5rem;
    }
    &:hover {
      background: #7bb0b9;
      cursor: pointer;
    }
  }
`;

const List = ({ isActive, setIsActive }) => {
  const input = useRef();

  useEffect(() => {
    if (isActive) {
      const title = input.current;
      title.value = '';
      title.focus();
    }
  }, [isActive]);

  // 리스트 생성
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const onChange = e => {
    setTitle(e.target.value);
  };
  const onCreate = useCallback(() => {
    if (!title) {
      alert('리스트 제목을 입력하세요!');
      return;
    }
    dispatch(addTasklist(title));
    setTitle('');
    setIsActive(!isActive);
  }, [title]);

  return (
    <>
      {isActive ? (
        <FormWrapper>
          <Input
            placeholder="리스트 제목"
            value={title}
            onChange={onChange}
            ref={input}
          />
          <HeaderBtnWrapper>
            <TiPlus role="button" onClick={onCreate} />
            <TiTimes role="button" onClick={() => setIsActive(!isActive)} />
          </HeaderBtnWrapper>
        </FormWrapper>
      ) : (
        <ViewWrapper role="button" onClick={() => setIsActive(!isActive)}>
          <TiPlus />
          <h4>업무리스트 추가</h4>
        </ViewWrapper>
      )}
    </>
  );
};

const AddTaskList = () => {
  const [isActive, setIsActive] = useState(false);

  return <List isActive={isActive} setIsActive={setIsActive} />;
};

export default AddTaskList;
