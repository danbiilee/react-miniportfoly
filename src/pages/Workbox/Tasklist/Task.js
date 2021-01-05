import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { BsCardChecklist, BsChat } from 'react-icons/bs';
import { IoMdAttach } from 'react-icons/io';
import { toggleTask } from '../../../module/tasklists';
import { today } from '../../../utils/utils';
import Tag from './components/Tag';
import Point from './components/Point';
import Checklist from './components/Checklist';
import Deadline from './components/Deadline';

const TaskWrapper = styled.div`
  display: ${props =>
    (props.isDone && !props.openDone && 'none') ||
    (props.isDone && props.openDone && 'block')};
  margin-top: 3px;
  padding: 20px 15px;
  background: ${props => (props.isDone ? '#eee' : '#fff')};
  color: #454545;
  &:hover {
    background: #f7f7f7;
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  h5 {
    display: flex;
    align-items: center;
    width: 82%;
    margin-top: 10px;
    svg {
      margin-right: 5px;
      color: ${props => props.theme.layoutBg2.color};
      font-size: 1.3rem;
    }
  }
`;

const EtcWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding-left: 3px;
  color: ${props => props.theme.outer.color};
  font-size: 0.7rem;
  span {
    display: inherit;
    margin-right: 10px;
    &:not(:last-of-type) svg {
      margin-right: 4px;
    }
  }
`;

const MberWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
`;

const Task = ({ tasklistId, task, openDone, handlePopup }) => {
  const {
    id,
    title,
    isDone,
    tag,
    point,
    checklist,
    mberList,
    startDt,
    endDt,
    finDt,
  } = task;
  const checklistDoneCnt = checklist.reduce((acc, cur) => acc + cur.isDone, 0);
  const dispatch = useDispatch();

  // 업무 완료 토글
  const onToggleTask = () => {
    const payload = {
      id: tasklistId,
      task: { id: task.id, finDt: task.finDt ? null : today },
    };
    dispatch(toggleTask(payload));
  };

  return (
    <>
      <TaskWrapper
        isDone={isDone}
        openDone={openDone}
        onClick={() => handlePopup(id)}
      >
        {tag && <Tag tag={tag} />}
        <TitleWrapper>
          <h5>
            <span onClick={onToggleTask}>
              {isDone ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            </span>
            {title}
          </h5>
          <Point point={point} />
        </TitleWrapper>
        {checklist.length ? <Checklist checklist={checklist} /> : null}
        {startDt || endDt || finDt ? (
          <Deadline startDt={startDt} endDt={endDt} finDt={finDt} />
        ) : null}
        <EtcWrapper>
          <span>
            <BsCardChecklist />
            {checklist.length ? `${checklistDoneCnt}/${checklist.length}` : 0}
          </span>
          {/* <span>
          <BsChat /> {commentList.length}
        </span>
        <span>
          <IoMdAttach /> {fileList.length}
        </span> */}
        </EtcWrapper>
        <MberWrapper>
          {mberList.map(mber =>
            React.createElement(mber.profile, { key: mber.mberNo }, null),
          )}
        </MberWrapper>
      </TaskWrapper>
    </>
  );
};

export default Task;
