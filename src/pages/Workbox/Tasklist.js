import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Post from '../../components/Layout/Post';
import Tasklist from './Tasklist/index';
import AddTaskList from './Tasklist/AddTaskList';

const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  border: 1px solid;
`;

const TasklistWrapper = () => {
  const { tasklists } = useSelector(state => state.tasklists);

  return (
    <Post fixed={true}>
      <h3>업무리스트</h3>
      <Wrapper>
        {tasklists.map(tasklist => (
          <Tasklist key={tasklist.id} tasklist={tasklist} />
        ))}
        <AddTaskList />
      </Wrapper>
    </Post>
  );
};

export default TasklistWrapper;
