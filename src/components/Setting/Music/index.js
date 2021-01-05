import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MdPlayArrow } from 'react-icons/md';
import { Audio } from '../../../utils/utils';
import { setCurSong } from '../../../module/playlist';
import Modal from '../../Modal/Modal';

const Wrapper = styled.div`
  background: #eee;
`;

const TitleWrapper = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 3px;
  background: darkgrey;
`;

const Title = styled.div`
  margin-left: 5px;
`;

const Setting = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Player = styled.audio`
  height: 10px;
  outline: none;
  &::-webkit-media-controls-panel {
    background: #eee;
  }
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    display: none;
  }
`;

const Button = styled.button`
  margin-right: 15px;
  font-size: 0.7rem;
  cursor: pointer;
`;

const PlayList = styled.ul`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  margin-top: 5px;
  padding: 10px;
  border-radius: 3px;
  background: #333;
  color: #eee;
`;

const Li = styled.li`
  padding: 5px 0;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #a5a5a5;
  }
  cursor: pointer;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  &:hover {
    font-weight: bold;
  }
  P:last-of-type {
    margin-top: 3px;
    color: #ccc;
    font-size: 0.6rem;
  }
`;

const PlayButton = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100% !important;
  width: 100% !important;
  border-radius: 10px;
  font-size: 2rem !important;
  cursor: pointer;
  &:hover {
    background: #79aaba;
  }
`;

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { list: miniPlaylist } = useSelector(state => state.playlist);
  const { curSong } = useSelector(state => state.playlist);

  const playerRef = useRef();
  const playlistRef = useRef();
  const audioRef = useRef(); // 리렌더링 방지
  //const curTime = useRef();

  const [isOpenModal, setIsOpenModal] = useState(false); // 모달
  const [isOpenList, setIsOpenList] = useState(false); // 재생목록
  const handleModal = () => setIsOpenModal(!isOpenModal);
  const handleList = () => setIsOpenList(!isOpenList);

  const handleCurSong = useCallback(
    (audio, idx) => {
      audio.setCurrentSong(idx);
      dispatch(
        setCurSong({
          idx: audio.idx,
          title: audio.title,
          curTime: !idx ? 0 : audio.player.currentTime,
        }),
      );
    },
    [dispatch],
  );

  const handleAutoplay = () => {
    const audio = audioRef.current;
    // 중지되어있으면 재생시키기
    if (audio.player.pause) {
      audio.play(curSong.curTime);
    }
    handleModal();
  };

  console.log('MusicPlayer', curSong);

  // 변경된 curSong.curTime 적용해서 재생시킴
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      console.log('mounted curSong!?!?!?!?! before play', curSong);
      const startPlay = audio.play(curSong.curTime);

      if (startPlay !== undefined) {
        startPlay.catch(e => {
          // 자동 재생 처리
          if (e.name === 'NotAllowedError') {
            if (!isOpenModal) {
              handleModal();
            }
          }
        });
      }
    }
  }, [curSong]);

  useEffect(() => {
    console.log('first mounted!!!!!');
    // audio 객체 생성
    audioRef.current = new Audio(
      playerRef.current,
      playlistRef.current.childNodes,
    );
    const audio = audioRef.current;

    // 마운트 후 재생목록 첫 번째 음악 재생, state에 저장
    if (!curSong.title) {
      handleCurSong(audio, 0);
    } else {
      audio.setCurrentSong(curSong.idx);
    }

    // 재생목록 반복
    audio.player.addEventListener('ended', () => {
      let idx = audio.idx;
      idx++;
      if (idx === audio.playlists.length) {
        idx = 0;
      }

      handleCurSong(audio, idx);
    });

    // 재생목록 클릭
    audio.playlists.forEach((item, idx) => {
      item.addEventListener('click', () => {
        handleCurSong(audio, idx);
      });
    });

    // 언마운트될 때 현재 재생중인 위치 저장
    return () => {
      console.log('unmounted', audio.player.currentTime);
      dispatch(
        setCurSong({
          idx: audio.idx,
          title: audio.title,
          curTime: audio.player.currentTime,
        }),
      );
    };
  }, []); // 빈 deps: 마운트, 언마운트 될 때만 실행

  return (
    <Wrapper>
      <Modal isOpen={isOpenModal} width={100} height={100} bg="lightblue">
        <PlayButton onClick={handleAutoplay}>🎶</PlayButton>
      </Modal>
      <TitleWrapper>
        🎶 <Title>{curSong.title}</Title>
      </TitleWrapper>
      <Setting>
        <Player
          type="audio/mp3"
          controls
          controlsList="nodownload"
          ref={playerRef}
        >
          Your browser does not support the audio element.
        </Player>
        <Button onClick={handleList}>List</Button>
      </Setting>
      <PlayList ref={playlistRef} isOpen={isOpenList}>
        {miniPlaylist.map((item, index) => (
          <Li key={index} data-title={item} isActive={index === curSong.idx}>
            <p>{item.split(' - ')[1]}</p>
            <p>{item.split(' - ')[0]}</p>
          </Li>
        ))}
      </PlayList>
    </Wrapper>
  );
};

export default MusicPlayer;
