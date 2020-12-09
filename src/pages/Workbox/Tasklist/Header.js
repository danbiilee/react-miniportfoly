import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { TiPencil, TiPlus, TiTimes } from 'react-icons/ti';
import MberList from './components/MberList';
import TagList from './components/TagList';
import Calendar from './components/Calendar';
import Modal from '../../../components/Modal/Modal';
import { getFormatDate } from '../../../utils/utils';
import {
  delTasklist,
  changeTasklistTitle,
  addTask,
} from '../../../module/tasklists';

const TitleWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: ${props => props.theme.layout.layoutBg1};
  h4 {
    width: 70%;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const Input = styled.input`
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
      background: #7bb0b9;
      cursor: pointer;
    }
  }
`;

const DoingWrapper = styled.div`
  padding: 6px 10px;
  background: #c0e0e5;
  color: #333;
  font-size: 0.75rem;
`;

const CreateTask = styled.div`
  display: ${props => (props.activeCreate ? 'block' : 'none')};
  width: 100%;
  padding: 0 10px 10px;
  background: ${props => props.theme.layout.layoutBg1};
  textarea {
    width: 100%;
    height: 65px;
    padding: 5px 7px;
    border: 2px solid ${props => props.theme.layout.mainColor};
    border-radius: 3px;
    border-bottom: 0;
    outline: 0;
    resize: none;
  }
`;

const CrBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: -10px;
  padding: 5px;
  background: white;
  border: 2px solid ${props => props.theme.layout.mainColor};
  border-radius: 3px;
  border-top: 0;
  ${props =>
    props.activeDate &&
    css`
      position: relative;
      padding-bottom: 35px;
      .cr-btn-r {
        position: absolute;
        right: 5px;
        top: 35px;
      }
    `}
  .cr-btn-l {
    display: flex;
    align-items: center;
    color: #868e96;
    font-size: 1rem;
    & > div {
      margin: 2px 5px 0 0;
    }
    & > svg {
      margin-right: 7px;
      cursor: pointer;
      &:first-of-type {
        font-size: 1.2rem;
      }
      &:hover {
        color: #656a70;
        cursor: pointer;
      }
    }
  }
`;

const Button = styled.button`
  padding: 3px 8px;
  border: 0;
  border-radius: 3px;
  font-size: 0.78rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonCancel = styled(Button)`
  color: #70767c;
  &:hover {
    background: #ccc;
  }
`;

const ButtonCreate = styled(Button)`
  margin-left: 5px;
  background: ${props => props.theme.layout.mainColor};
  color: white;
  &:hover {
    background: #1d80a3;
  }
`;

const BadgeWrapper = styled.div`
  position: relative;
  .badge {
    position: absolute;
    right: 0;
    top: -6px;
    z-index: 10;
    padding: 2px 4px;
    border-radius: 4px;
    color: white;
    font-size: 0.5rem;
    &.mber {
      background: #6f777e;
    }
    &.priority {
      background: #e03131;
    }
    &.important {
      background: #3b5bdb;
    }
    &.notice {
      background: #fcc419;
    }
  }
  ${props =>
    props.tag &&
    css`
      .badge {
        background: ${props.theme.component[props.tag]};
      }
    `}
`;

const Title = ({ tasklist, formMode, setFormMode, onToggle, onDelete }) => {
  const { id } = tasklist;
  const input = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!formMode) setTitle(tasklist.title);
    else input.current.focus();
  }, [formMode, tasklist.title, input]);

  // 업무리스트 제목 관련
  const [title, setTitle] = useState(tasklist.title);
  const onChange = e => setTitle(e.target.value);
  const handleTitle = () => {
    const payload = {
      id,
      title,
    };
    dispatch(changeTasklistTitle(payload));
    setFormMode(!formMode);
  };

  // 모달
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} width={500} height={300} bg="lightgoldenrodyellow">
        <h4>⚠ [{title}] 을 정말로 삭제하시겠습니까?</h4>

        <div>
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            닫기
          </button>
          <button type="button" onClick={() => onDelete(id)}>
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
              <TiPlus role="button" onClick={() => onToggle('wrapper')} />
              <TiTimes role="button" onClick={() => setIsOpen(!isOpen)} />
            </TitleBtnWrapper>
          </>
        ) : (
          <>
            <Input value={title} ref={input} onChange={onChange} />
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

const Doing = ({ tasks }) => {
  const undoneCnt = tasks
    ? tasks.reduce((acc, cur) => acc + !cur.isDone, 0)
    : 0;

  return <DoingWrapper>진행 중인 업무 {undoneCnt}개</DoingWrapper>;
};

const Header = ({ tasklist }) => {
  const dispatch = useDispatch();
  const { id, tasks } = tasklist;

  // 업무리스트 제목 수정
  // true: 수정, false: 조회
  const [formMode, setFormMode] = useState(false);

  // 업무리스트 삭제: 삭제 전 모달로 확인
  const onDelete = id => dispatch(delTasklist(id));

  // 업무 생성
  // DOM 관리
  const textarea = useRef();

  // 활성화값 관리
  const [activeCreate, setActiveCreate] = useState(false);
  const [activeMber, setActiveMber] = useState(false);
  const [activeTag, setActiveTag] = useState(false);
  const [activeDate, setActiveDate] = useState(false);
  // 선택값 관리
  const [mberList, setMberList] = useState([]);
  const [tag, setTag] = useState(null);
  const [startDt, setStartDate] = useState(null);
  const [endDt, setEndDate] = useState(null);

  // 선택값 초기화
  const resetState = () => {
    setMberList([]);
    setTag(null);
    setStartDate(null);
    setEndDate(null);
    if (textarea.current) textarea.current.value = '';
  };

  const onToggle = type => {
    if (type === 'wrapper') {
      setActiveCreate(!activeCreate);
      if (activeMber) setActiveMber(!activeMber);
      if (activeTag) setActiveTag(!activeTag);
      if (activeDate) setActiveDate(!activeDate);
      resetState();
    } else if (type === 'mber') {
      setActiveMber(!activeMber);
      if (activeTag) setActiveTag(!activeTag);
      if (!startDt && !endDt && activeDate) setActiveDate(!activeDate);
    } else if (type === 'tag') {
      setActiveTag(!activeTag);
      if (activeMber) setActiveMber(!activeMber);
      if (!startDt && !endDt && activeDate) setActiveDate(!activeDate);
    } else if (type === 'date') {
      setActiveDate(!activeDate);
      if (activeMber) setActiveMber(!activeMber);
      if (activeTag) setActiveTag(!activeTag);
    }
  };

  // 선택 멤버리스트값 관리
  const handleMberList = mber => {
    const findMber = mberList.find(m => m.mberNo === mber.mberNo);
    if (findMber) {
      setMberList(mberList.filter(m => m.mberNo !== mber.mberNo));
    } else {
      setMberList(mberList.concat(mber));
    }
    setActiveMber(!activeMber);
  };

  // 선택 태그값 관리
  const handleTag = tagNm => {
    if (tag === tagNm) {
      setTag('');
    } else {
      setTag(tagNm);
    }
    setActiveTag(!activeTag);
  };

  const onCreate = () => {
    const title = textarea.current;

    // 유효성 검사
    if (!title.value) {
      alert('업무 이름을 입력하세요!');
      title.focus();
      return;
    }
    if (startDt && endDt && startDt > endDt) {
      alert('마감일은 시작일보다 빠를 수 없습니다!');
      setEndDate(null);
      return;
    }

    const task = {
      title: title.value,
      isDone: false,
      tag,
      point: null,
      checklist: [],
      mberList,
      startDt: getFormatDate(startDt),
      endDt: getFormatDate(endDt),
      finDt: null,
    };
    dispatch(addTask({ id, task }));

    title.value = '';
    resetState();
    onToggle('wrapper');
  };

  return (
    <>
      <Title
        tasklist={tasklist}
        formMode={formMode}
        setFormMode={setFormMode}
        onToggle={onToggle}
        onDelete={onDelete}
      />
      <Doing tasks={tasks} />
      <CreateTask activeCreate={activeCreate}>
        <textarea placeholder="새 업무 만들기" ref={textarea}></textarea>
        <CrBtnWrapper activeDate={activeDate}>
          <div className="cr-btn-l">
            <BadgeWrapper>
              {mberList.length > 0 && (
                <span className="badge mber">{mberList.length}</span>
              )}
              <MberList
                onToggle={onToggle}
                activeMber={activeMber}
                selectedMberList={mberList}
                handleMberList={handleMberList}
              />
            </BadgeWrapper>
            <BadgeWrapper tag={tag}>
              {tag && <span className="badge">1</span>}
              <TagList
                onToggle={onToggle}
                activeTag={activeTag}
                tag={tag}
                handleTag={handleTag}
              />
            </BadgeWrapper>
            <Calendar
              onToggle={onToggle}
              activeDate={activeDate}
              startDt={startDt}
              endDt={endDt}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
          <div className="cr-btn-r">
            <ButtonCancel onClick={() => onToggle('wrapper')}>
              취소
            </ButtonCancel>
            <ButtonCreate onClick={onCreate}>만들기</ButtonCreate>
          </div>
        </CrBtnWrapper>
      </CreateTask>
    </>
  );
};

export default Header;
