import React, { useState, useRef } from 'react';
import { TiPencil, TiPlus, TiTimes } from 'react-icons/ti';
import { MdFace } from 'react-icons/md';
import className from 'classnames';
import {
  useTaskState,
  useTaskNextId,
  useTaskDispatch,
} from '../../../reducers/TaskContext';
import AddMber from './components/MberList';
import AddTag from './components/TagList';
import AddCalendar from './components/Calendar';
import { today, getFormatDate } from '../../../../src/utils/utils';

const Title = () => {
  const dispatch = useTaskDispatch();
  const tasks = useTaskState();
  let nextId = useTaskNextId();

  const textarea = useRef();
  const undoneCnt = tasks.reduce((acc, cur) => acc + !cur.isDone, 0);

  const [isActive, setIsActive] = useState(false);
  const [onMber, setOnMber] = useState(false);
  const [onTag, setOnTag] = useState(false);
  const [onDate, setOnDate] = useState(false);
  const [mberList, setMberList] = useState([]);
  const [tag, setTag] = useState(null);
  const [stDt, setStartDate] = useState(null);
  const [endDt, setEndDate] = useState(null);

  const resetState = () => {
    setMberList([]);
    setTag(null);
    setStartDate(null);
    setEndDate(null);
  };

  const onToggle = type => {
    if (type === 'wrapper') {
      setIsActive(!isActive);
      if (onMber) setOnMber(!onMber);
      if (onTag) setOnTag(!onTag);
      if (onDate) setOnDate(!onDate);
      resetState();
    } else if (type === 'mber') {
      setOnMber(!onMber);
      if (onTag) setOnTag(!onTag);
      if (!stDt && !endDt && onDate) setOnDate(!onDate);
    } else if (type === 'tag') {
      setOnTag(!onTag);
      if (onMber) setOnMber(!onMber);
      if (!stDt && !endDt && onDate) setOnDate(!onDate);
    } else if (type === 'date') {
      setOnDate(!onDate);
      if (onMber) setOnMber(!onMber);
      if (onTag) setOnTag(!onTag);
    }
  };

  const handleMberList = mber => {
    const findMber = mberList.find(m => m.mberNo === mber.mberNo);
    if (findMber) {
      setMberList(mberList.filter(m => m.mberNo !== mber.mberNo));
    } else {
      setMberList(mberList.concat(mber));
    }
    setOnMber(!onMber);
  };

  const handleTag = tagNm => {
    if (tag === tagNm) {
      setTag('');
    } else {
      setTag(tagNm);
    }
    setOnTag(!onTag);
  };

  const onCreate = () => {
    const title = textarea.current;

    // 유효성 검사
    if (!title.value) {
      alert('업무 이름을 입력하세요!');
      title.focus();
      return;
    }
    if (stDt && endDt && stDt > endDt) {
      alert('마감일은 시작일보다 빠를 수 없습니다!');
      setEndDate(null);
      return;
    }

    dispatch({
      type: 'CREATE',
      task: {
        id: nextId.current,
        title: title.value,
        isDone: false,
        tag,
        point: null,
        chkList: [],
        commentList: [],
        fileList: [],
        mberList,
        stDt: getFormatDate(stDt),
        endDt: getFormatDate(endDt),
        finDt: null,
        regMber: {
          mberNo: 1,
          mberId: 'danbi',
          mberNm: '이단비',
          profile: MdFace,
        },
        regDt: today,
        updMber: null,
        updDt: null,
      },
    });
    nextId.current++;
    title.value = '';
    resetState();
  };

  return (
    <>
      <header className="Title">
        <h3>메인페이지 분리하기</h3>
        <div className="btn-wrapper">
          <TiPencil />
          <TiPlus onClick={() => onToggle('wrapper')} />
          <TiTimes />
        </div>
        <div className={className('create-wrapper', { isActive: isActive })}>
          <textarea placeholder="새 업무 만들기" ref={textarea}></textarea>
          <div className={className('cr-btn-wrapper', { onDate: onDate })}>
            <div className="cr-btn-l">
              <div className="badge-wrapper">
                {mberList.length > 0 && (
                  <span className="badge mber">{mberList.length}</span>
                )}
                <AddMber
                  onToggle={onToggle}
                  onMber={onMber}
                  selectedMberList={mberList}
                  handleMberList={handleMberList}
                />
              </div>
              <div className="badge-wrapper">
                {tag && <span className={className('badge', tag)}>1</span>}
                <AddTag
                  onToggle={onToggle}
                  onTag={onTag}
                  tag={tag}
                  handleTag={handleTag}
                />
              </div>
              <AddCalendar
                onToggle={onToggle}
                onDate={onDate}
                stDt={stDt}
                endDt={endDt}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>
            <div className="cr-btn-r">
              <button
                className="btn-cancel"
                onClick={() => onToggle('wrapper')}
              >
                취소
              </button>
              <button className="btn-create" onClick={onCreate}>
                만들기
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="tasklist-doing">진행 중인 업무 {undoneCnt}개</div>
    </>
  );
};

export default Title;
