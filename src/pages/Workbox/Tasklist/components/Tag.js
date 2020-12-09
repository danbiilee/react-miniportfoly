import React from 'react';
import styled from 'styled-components';

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

export default Tag;
