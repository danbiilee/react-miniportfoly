import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { MdCheckBoxOutlineBlank, MdCheckBox, MdFace } from 'react-icons/md';
import { TiPencil, TiPlus, TiTimes } from 'react-icons/ti';
import { addChecklist, setTask } from '../../../../module/tasklists';

const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.layout.layoutBg2};
  border-radius: 3px;
`;

const List = styled.li`
  display: flex;
  height: 30px;
  border-radius: 3px;
  border-bottom: 1px solid ${props => props.theme.layout.layoutBg2};
  &:last-of-type {
    border-bottom: 0;
  }
  background: #fff;
  ${props =>
    props.isSetting
      ? css`
          &:not(:last-of-type):hover {
            background: pink;
          }
        `
      : css`
          &:hover {
            background: #f7f7f7;
          }
        `}
  & > div {
    padding: 5px 10px;
  }
`;

const Chkbox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  border-right: 3px double ${props => props.theme.component.priority};
  color: ${props => props.theme.layout.outer};
  font-size: 0.9rem;
  cursor: pointer;
  &.addBtn:hover {
    background: #f7f7f7;
  }
`;

const Chktxt = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  font-size: 0.8rem;
  white-space: nowrap;
  svg {
    margin-right: 5px;
    font-size: 1.3rem;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &.addBtn:hover {
    background: #f7f7f7;
    input {
      background: #f7f7f7;
    }
  }
`;

const Input = styled.input`
  padding: 3px 7px;
  border: 2px solid ${props => props.theme.layout.mainColor};
  border: 0;
  border-radius: 3px;
`;

const Checklist = ({
  isSetting,
  tasklistId,
  task,
  checklist,
  handleCheckList,
}) => {
  const dispatch = useDispatch();

  // Add Checklist
  const newTitleInput = useRef();
  const [newTitle, setNewTitle] = useState('');
  const onChange = e => {
    setNewTitle(e.target.value);
  };

  const onCreate = () => {
    // Validation Check
    if (!newTitle) {
      alert('체크리스트명을 입력해 주세요!');
      newTitleInput.current.focus();
      return;
    }

    dispatch(
      addChecklist({
        tasklistId,
        task,
        checklist: {
          title: newTitle,
          isDone: false,
        },
      }),
    );
    setNewTitle('');

    // 체크리스트 생성 후 state.tasklists.task 도 업데이트
    dispatch(
      setTask({
        tasklistId,
        taskId: task.id,
      }),
    );
  };

  return (
    <Wrapper>
      <ul>
        {checklist.map(item => (
          <List key={item.id} isSetting={isSetting}>
            <Chkbox>
              {item.isDone ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            </Chkbox>
            <Chktxt>
              {item.assignedMber &&
                React.createElement(item.assignedMber.profile)}
              <span>{item.title}</span>
            </Chktxt>
          </List>
        ))}
        {isSetting && (
          <List key="add" isSetting={isSetting}>
            <Chkbox className="addBtn" role="button" onClick={onCreate}>
              <TiPlus />
            </Chkbox>
            <Chktxt className="addBtn">
              <Input
                name="newTitle"
                value={newTitle}
                onChange={onChange}
                ref={newTitleInput}
                placeholder="체크리스트 추가하기"
              />
            </Chktxt>
          </List>
        )}
      </ul>
    </Wrapper>
  );
};

export default Checklist;
