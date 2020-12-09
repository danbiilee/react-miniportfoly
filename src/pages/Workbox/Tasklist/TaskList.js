import React, { useState } from 'react';
import Title from './Title';
import Task from './Task';
import './TaskList.scss';
import { useTaskState } from '../../reducers/TaskContext';
import Done from './Done';

const TaskList = () => {
  const [isActive, setIsActive] = useState(false);
  const tasks = useTaskState();
  const taskList = tasks.filter(item => !item.isDone);
  const doneList = tasks.filter(item => item.isDone);

  const onToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <section className="TaskList">
        <Title />
        <div className="task-wrapper">
          {taskList.map(task => (
            <Task key={task.id} task={task} />
          ))}
          {doneList.map(task => (
            <Task key={task.id} type="done" task={task} isActive={isActive} />
          ))}
        </div>
        <Done cnt={doneList.length} onToggle={onToggle} />
      </section>
    </>
  );
};

export default TaskList;
