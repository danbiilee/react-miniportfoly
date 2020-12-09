import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as apiBoards from '../../api/boards';
import { setFormMode } from '../../module/formMode';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  button {
    align-self: flex-end;
    margin: 0 10px 10px 0;
  }
  input {
    height: 28px;
  }
  textarea {
    height: 90%;
    margin-top: 10px;
    resize: none;
  }
`;

const Button = styled.button`
  float: right;
  margin: 0 10px 10px 0;
`;

const FormWrapper = ({ regusr, passwd }) => {
  const dispatch = useDispatch();
  const { formMode: isForm } = useSelector(state => state);

  // Board
  const initialState = {
    bbs_ctgry1: 'WORK_LOG',
    bbs_ctgry2: 'REACT',
    title: '',
    content: '',
    regusr,
    passwd,
  };
  const [board, setBoard] = useState(initialState);
  const onChange = e => {
    const { name, value } = e.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  // Submit form
  const onSubmit = e => {
    e.preventDefault();

    if (!board.title) {
      alert('제목을 입력해 주세요!');
      return;
    }
    if (!board.content) {
      alert('내용을 입력해 주세요!');
      return;
    }

    if (window.confirm('글을 등록하시겠습니까?')) {
      apiBoards
        .addBoard(board)
        .then(data => {
          if (data.success) {
            alert('글 등록 성공!');
            dispatch(setFormMode(!isForm));
            setBoard(initialState);
          }
        })
        .catch(err => alert('글 등록 실패!'));
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <button type="submit">등록하기</button>
      <div className="select-wrapper">
        <select name="bbs_ctgry1" value={board.bbs_ctgry1} onChange={onChange}>
          <option value="WORK_LOG">작업일지</option>
          <option value="STUDY">공부노트</option>
        </select>
        {board.bbs_ctgry1 === 'STUDY' && (
          <select
            name="bbs_ctgry2"
            value={board.bbs_ctgry2}
            onChange={onChange}
          >
            <option value="REACT">리액트</option>
            <option value="JS">자바스크립트</option>
          </select>
        )}
      </div>
      <input type="text" name="title" value={board.title} onChange={onChange} />
      <textarea
        name="content"
        value={board.content}
        onChange={onChange}
      ></textarea>
    </Form>
  );
};

export default FormWrapper;
