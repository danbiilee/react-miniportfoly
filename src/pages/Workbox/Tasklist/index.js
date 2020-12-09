import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setTask } from '../../../module/tasklists';
import Header from './Header';
import Bottom from './Bottom';
import Task from './Task';
import SidePopup from './SidePopup';

const Article = styled.article`
  width: 300px;
  margin-right: 10px;
`;

const TaskList = styled.div`
  max-height: 600px;
  overflow-y: auto;
  background: #f7f7f7;
  & > div:first-of-type {
    margin-top: 0;
  }
`;

const Tasklist = ({ tasklist }) => {
  const { tasks } = tasklist;
  const undoneList = tasks ? tasks.filter(item => !item.isDone) : []; // 진행 중인 업무
  const doneList = tasks ? tasks.filter(item => item.isDone) : []; // 완료된 업무

  // 완료된 업무 보기
  const [openDone, setOpenDone] = useState(false);
  const onToggle = () => setOpenDone(!openDone);

  // 업무 선택 -> 수정팝업 오픈
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const handlePopup = id => {
    dispatch(
      setTask({
        tasklistId: tasklist.id,
        taskId: id,
      }),
    );
    setOpenPopup(!openPopup);
  };

  return (
    <Article>
      {openPopup && (
        <SidePopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          tasklistId={tasklist.id}
        />
      )}
      <Header tasklist={tasklist} />
      <TaskList>
        {undoneList.map(task => (
          <Task
            key={task.id}
            tasklistId={tasklist.id}
            task={task}
            handlePopup={handlePopup}
          />
        ))}
        {doneList.map(task => (
          <Task
            key={task.id}
            tasklistId={tasklist.id}
            task={task}
            openDone={openDone}
            handlePopup={handlePopup}
          />
        ))}
      </TaskList>
      <Bottom cnt={doneList.length} onToggle={onToggle} />
    </Article>
  );
};

export default Tasklist;
