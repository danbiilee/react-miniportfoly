import React from 'react';
import styled from 'styled-components';
import { MdLocalOffer, MdCheck } from 'react-icons/md';

const Wrapper = styled.div`
  position: relative;
  svg {
    margin-right: 5px;
    font-size: 1.2rem;
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
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 10;
  display: ${props => (props.activeTag ? 'block' : 'none')};
  width: 120px;
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
  }
`;

const TagWrapper = styled.div`
  display: inline-block;
  padding: 4px 5px;
  border-radius: 1rem;
  background: ${props => props.tag && props.theme.component[props.tag]};
  color: white;
  font-size: 0.6rem;
  font-weight: bold;
`;

const Tag = ({ tag }) => {
  return <TagWrapper tag={tag}>{tag}</TagWrapper>;
};

const TagList = ({ onToggle, activeTag, tag, handleTag }) => {
  const tagList = [
    {
      tagNo: 1,
      tagNm: 'priority',
    },
    {
      tagNo: 2,
      tagNm: 'important',
    },
    {
      tagNo: 3,
      tagNm: 'notice',
    },
  ]; // 임시
  let tempTagList = tagList.map(t => {
    if (t.tagNm === tag) return { ...t, isSelected: true };
    else return { ...t, isSelected: false };
  });

  return (
    <Wrapper>
      <MdLocalOffer
        className="btn"
        role="button"
        onClick={() => onToggle('tag')}
      />
      <ListWrapper activeTag={activeTag}>
        {tempTagList.map(tag => (
          <li
            key={tag.tagNo}
            onClick={() => {
              handleTag(tag.tagNm);
            }}
          >
            <Tag tag={tag.tagNm} />
            {tag.isSelected && <MdCheck />}
          </li>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default TagList;
