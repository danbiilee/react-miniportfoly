import React, { useState } from 'react';
import styled from 'styled-components';
import Post from '../../components/Layout/Post';

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  height: 35px;
  margin-right: 8px;
  padding: 0 20px;
  border-radius: 20px;
  border: 2px solid;
  background: #fff;
  line-height: 35px;
  font-weight: bold;
  font-size: 0.9rem;
  outline: 0;
  cursor: pointer;
  &:hover {
    background: #333;
    color: #fff;
  }
`;

const PhotoWrapper = styled.div``;

const PhotoEditor = () => {
  const onChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
    };
  };

  // The way to load image
  const [mode, setMode] = useState('');

  return (
    <Post>
      <h3>사진을 꾸며봐요</h3>
      <ButtonWrapper>
        <Button onClick={() => setMode('take')}>촬영</Button>
        <Button onClick={() => setMode('load')}>불러오기</Button>
      </ButtonWrapper>
      <PhotoWrapper>
        {mode && mode === 'take' ? (
          <video></video>
        ) : (
          <input type="file" onChange={onChange} />
        )}
      </PhotoWrapper>
    </Post>
  );
};

export default PhotoEditor;
