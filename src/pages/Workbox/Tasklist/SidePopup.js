import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TiPencil, TiTimes } from 'react-icons/ti';
import {
  setTask,
  clearTask,
  changeTaskTitle,
  delTask,
  changeTaskSettings,
} from '../../../module/tasklists';
import { getFormatDate, strToDate } from '../../../utils/utils';
import Modal from '../../../components/Modal/Modal';
import Calendar from './components/Calendar';
import MberList from './components/MberList';
import TagList from './components/TagList';
import Tag from './components/Tag';
import PointList from './components/PointList';
import Checklist from './components/Checklist';

const Wrapper = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: 50px;
  width: 300px;
  height: 500px;
  background: #f7f7f7;
  border-radius: 8px;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: -50px;
  top: 10px;
  z-index: -1;
  display: flex;
  align-items: center;
  width: 60px;
  height: 50px;
  padding-left: 20px;
  background: pink;
  border: 0;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const TitleWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  border-bottom: 2px solid ${props => props.theme.layout.mainColor};
  border-radius: 8px 8px 0 0;
  h4 {
    width: 70%;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const TitleInput = styled.input`
  width: 75%;
  padding: 3px 7px;
  border: 2px solid ${props => props.theme.layout.mainColor};
  border-radius: 3px;
  outline: 0;
`;

const TitleBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  svg {
    margin-left: 8px;
    &:nth-child(2) {
      margin-left: 10px;
      font-size: 1.3rem;
    }
    &:nth-child(3) {
      font-size: 1.5rem;
    }
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;

const Setting = styled.div`
  display: flex;
`;

const Title = ({
  openPopup,
  setOpenPopup,
  tasklistId,
  formMode,
  setFormMode,
}) => {
  const { task } = useSelector(state => state.tasklists);
  const dispatch = useDispatch();

  const input = useRef();
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    if (!formMode) setTitle(task.title);
    else input.current.focus();
  }, [formMode, task, input]);

  // Set payload about Ids
  const payload = {
    tasklistId,
    taskId: task.id,
  };

  // Handle Task title
  const onChange = e => setTitle(e.target.value);
  const handleTitle = () => {
    dispatch(
      changeTaskTitle({
        tasklistId,
        taskId: task.id,
        title,
      }),
    );
    dispatch(setTask(payload));
    setFormMode(!formMode);
  };

  // Delete Task
  // Modal
  const [openModal, setOpenModal] = useState(false);
  const onDelete = () => {
    dispatch(delTask(payload));
    dispatch(clearTask());
    setOpenModal(!openModal);
    setOpenPopup(!openPopup);
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        width={500}
        height={300}
        bg="lightgoldenrodyellow"
      >
        <h4>⚠ [{title}] 을 정말로 삭제하시겠습니까?</h4>
        <div>
          <button type="button" onClick={() => setOpenModal(!openModal)}>
            닫기
          </button>
          <button type="button" onClick={onDelete}>
            삭제하기
          </button>
        </div>
      </Modal>
      <TitleWrapper>
        {!formMode ? (
          <>
            <h4>{title}</h4>
            <TitleBtnWrapper>
              <TiPencil role="button" onClick={() => setFormMode(!formMode)} />
              <TiTimes role="button" onClick={() => setOpenModal(!openModal)} />
            </TitleBtnWrapper>
          </>
        ) : (
          <>
            <TitleInput value={title} ref={input} onChange={onChange} />
            <TitleBtnWrapper>
              <TiPencil role="button" onClick={handleTitle} />
              <TiTimes role="button" onClick={() => setFormMode(!formMode)} />
            </TitleBtnWrapper>
          </>
        )}
      </TitleWrapper>
    </>
  );
};

const Dates = ({ task, tasklistId, onToggle, activeDate }) => {
  const dispatch = useDispatch();

  // Convert String to Date: Calendar's format is only possible to date type
  const startDate = task.startDt ? strToDate(task.startDt) : null;
  const endDate = task.endDt ? strToDate(task.endDt) : null;

  const [startDt, setStartDate] = useState(startDate);
  const [endDt, setEndDate] = useState(endDate);

  // Convert Date to String for setting task's state
  const startStr = startDt ? getFormatDate(startDt) : null;
  const endStr = endDt ? getFormatDate(endDt) : null;

  useEffect(() => {
    if (task.startDt !== startStr || task.endDt !== endStr) {
      dispatch(
        changeTaskSettings({
          tasklistId,
          task: {
            ...task,
            startDt: startStr,
            endDt: endStr,
          },
        }),
      );
    }
  }, [dispatch, startDt, endDt, endStr, startStr, task, tasklistId]);

  return (
    <Setting>
      <p>기한</p>
      <Calendar
        onToggle={onToggle}
        activeDate={activeDate}
        startDt={startDt}
        endDt={endDt}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </Setting>
  );
};

const Mbers = ({ task, tasklistId, onToggle, activeMber }) => {
  const dispatch = useDispatch();

  const [mberList, setMberList] = useState(task.mberList);
  const handleMberList = mber => {
    const findMber = mberList.find(m => m.mberNo === mber.mberNo);
    if (findMber) {
      setMberList(mberList.filter(m => m.mberNo !== mber.mberNo));
    } else {
      setMberList(mberList.concat(mber));
    }
    onToggle('mber');
  };

  useEffect(() => {
    // Compare selectedMberList with task.mberList
    let diff = 0;
    for (let item of mberList) {
      const existingMber = task.mberList.find(m => m.mberNo === item.mberNo);
      if (existingMber) diff++;
    }

    // If find diffrence, Change task state!
    if (diff) {
      dispatch(
        changeTaskSettings({
          tasklistId,
          task: {
            ...task,
            mberList,
          },
        }),
      );
    }
  }, [dispatch, mberList, task, tasklistId]);

  return (
    <Setting>
      <p>배정 멤버</p>
      <ul>
        {mberList.length > 0 &&
          mberList.map(mber => (
            <li key={mber.mberNo}>
              {React.createElement(mber.profile)}
              {mber.mberNm}
            </li>
          ))}
      </ul>
      <MberList
        onToggle={onToggle}
        activeMber={activeMber}
        selectedMberList={mberList}
        handleMberList={handleMberList}
      />
    </Setting>
  );
};

const Tags = ({ task, tasklistId, activeTag, onToggle }) => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState(task.tag);

  const handleTag = tagNm => {
    if (tag === tagNm) {
      setTag('');
    } else {
      setTag(tagNm);
    }
    onToggle('tag');
  };

  useEffect(() => {
    // If find diffrence, Change task state!
    if (tag !== task.tag) {
      dispatch(
        changeTaskSettings({
          tasklistId,
          task: {
            ...task,
            tag,
          },
        }),
      );
    }
  }, [dispatch, tag, task, tasklistId]);

  return (
    <Setting>
      <p>태그</p>
      {tag && <Tag tag={tag} />}
      <TagList
        onToggle={onToggle}
        activeTag={activeTag}
        tag={tag}
        handleTag={handleTag}
      />
    </Setting>
  );
};

const Points = ({ task, tasklistId, activePoint, onToggle }) => {
  const dispatch = useDispatch();
  const [point, setPoint] = useState(task.point ? task.point : 0);

  const handlePoint = point => {
    setPoint(point);
    onToggle('point');
  };

  useEffect(() => {
    // If find diffrence, Change task state!
    if (point !== task.point) {
      dispatch(
        changeTaskSettings({
          tasklistId,
          task: {
            ...task,
            point,
          },
        }),
      );
    }
  }, [dispatch, point, task, tasklistId]);

  return (
    <Setting>
      <p>포인트</p>
      <PointList
        point={point}
        handlePoint={handlePoint}
        activePoint={activePoint}
        onToggle={onToggle}
      />
    </Setting>
  );
};

// 미적용
const Checklists = ({ task, tasklistId }) => {
  const dispatch = useDispatch();
  const [checklist, setChecklist] = useState(task.checklist);

  const handleCheckList = chk => {
    const findChk = checklist.find(c => c.chkNo === chk.chkNo);
    if (findChk) {
      setChecklist(checklist.filter(c => c.chkNo !== chk.chkNo));
    } else {
      setChecklist(checklist.concat(chk));
    }
  };

  useEffect(() => {
    // Compare checklist with task.checklist
    let diff = 0;
    for (let item of checklist) {
      const existing = task.checklist.find(c => c.chkNo === item.chkNo);
      if (existing) diff++;
    }

    // If find diffrence, Change task state!
    if (diff) {
      dispatch(
        changeTaskSettings({
          tasklistId,
          task: {
            ...task,
            checklist,
          },
        }),
      );
    }
  }, [dispatch, checklist, task, tasklistId]);

  return (
    <Setting>
      <Checklist
        isSetting={true}
        tasklistId={tasklistId}
        task={task}
        checklist={checklist}
        handleCheckList={handleCheckList}
      />
    </Setting>
  );
};

const SidePopup = ({ openPopup, setOpenPopup, tasklistId }) => {
  const { task } = useSelector(state => state.tasklists);
  const wrapper = useRef();
  console.log('Sidepopup', task);

  // Set popup's position
  let interval;
  let left = window.innerWidth - 450;
  const setPosition = () => {
    left = window.innerWidth - 450;
    wrapper.current.style.left = `${left}px`;
  };

  useEffect(() => {
    interval = setInterval(setPosition, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Set task title's mode
  const [formMode, setFormMode] = useState(false);

  // States about activation
  const [activeDate, setActiveDate] = useState(false);
  const [activeMber, setActiveMber] = useState(false);
  const [activeTag, setActiveTag] = useState(false);
  const [activePoint, setaActivePoint] = useState(false);

  const handleActiveStates = type => {
    if (type !== 'date' && activeDate) setActiveDate(!activeDate);
    else if (type !== 'mber' && activeMber) setActiveMber(!activeMber);
    else if (type !== 'tag' && activeTag) setActiveTag(!activeTag);
    else if (type !== 'point' && activePoint) setaActivePoint(!activePoint);
  };

  const onToggle = type => {
    if (type === 'date') {
      setActiveDate(!activeDate);
      handleActiveStates(type);
    } else if (type === 'mber') {
      setActiveMber(!activeMber);
      handleActiveStates(type);
    } else if (type === 'tag') {
      setActiveTag(!activeTag);
      handleActiveStates(type);
    } else if (type === 'point') {
      setaActivePoint(!activePoint);
      handleActiveStates(type);
    }
  };

  return (
    <Wrapper ref={wrapper} left={left}>
      <CloseBtn onClick={() => setOpenPopup(!openPopup)}>닫기</CloseBtn>
      <Title
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        tasklistId={tasklistId}
        formMode={formMode}
        setFormMode={setFormMode}
      />
      <Dates
        task={task}
        tasklistId={tasklistId}
        activeDate={activeDate}
        onToggle={onToggle}
      />
      <Mbers
        task={task}
        tasklistId={tasklistId}
        activeMber={activeMber}
        onToggle={onToggle}
      />
      <Tags
        task={task}
        tasklistId={tasklistId}
        activeTag={activeTag}
        onToggle={onToggle}
      />
      <Points
        task={task}
        tasklistId={tasklistId}
        activePoint={activePoint}
        onToggle={onToggle}
      />
      {/* <Checklists task={task} tasklistId={tasklistId} /> */}
    </Wrapper>
  );
};

export default SidePopup;
