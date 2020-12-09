import React from 'react';
import styled from 'styled-components';
import {
  MdGroupAdd,
  MdCheck,
  MdFace,
  MdSentimentNeutral,
} from 'react-icons/md';

const Wrapper = styled.div`
  position: relative;
  svg {
    margin-right: 5px;
    font-size: 1.4rem;
  }
  .btn {
    cursor: pointer;
    &:hover {
      color: #656a70;
      cursor: pointer;
    }
  }
`;

const ListWrapper = styled.ul`
  display: ${props => (props.activeMber ? 'block' : 'none')};
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 10;
  width: 140px;
  height: 120px;
  overflow-y: auto;
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
    .info-wrapper {
      display: flex;
      align-items: center;
    }
    .info-wrapper + svg {
      margin: 0;
    }
  }
`;

const MberList = ({
  onToggle,
  activeMber,
  selectedMberList,
  handleMberList,
}) => {
  const mberList = [
    {
      mberNo: 1,
      mberId: 'danbi',
      mberNm: '이단비',
      profile: MdFace,
    },
    {
      mberNo: 2,
      mberId: 'ash',
      mberNm: '애쉬',
      profile: MdSentimentNeutral,
    },
    {
      mberNo: 3,
      mberId: 'sikk',
      mberNm: '식케이',
      profile: MdFace,
    },
    {
      mberNo: 4,
      mberId: 'moon',
      mberNm: '문',
      profile: MdSentimentNeutral,
    },
    {
      mberNo: 5,
      mberId: 'jay',
      mberNm: '박재범',
      profile: MdFace,
    },
    {
      mberNo: 6,
      mberId: 'coo',
      mberNm: '쿠기',
      profile: MdSentimentNeutral,
    },
  ]; // 임시
  let tempMberList = [];
  if (mberList.length) {
    tempMberList = mberList.map(mber => {
      const m = selectedMberList.find(m => m.mberNo === mber.mberNo);
      if (m) return { ...mber, isSelected: true };
      else return { ...mber, isSelected: false };
    });
  }

  return (
    <Wrapper>
      <MdGroupAdd
        className="btn"
        role="button"
        onClick={() => onToggle('mber')}
      />
      <ListWrapper activeMber={activeMber}>
        {tempMberList.map(mber => (
          <li
            key={mber.mberNo}
            onClick={() => {
              const fm = mberList.find(item => item.mberNo === mber.mberNo);
              handleMberList(fm);
            }}
          >
            <div>
              {React.createElement(mber.profile)}
              {mber.mberNm}
            </div>
            {mber.isSelected && <MdCheck />}
          </li>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default MberList;
