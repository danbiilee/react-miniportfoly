# BGM 

> ⚠ 플레이리스트는 구매 후 개인 소장중인 mp3 파일들로 구성하였습니다. 문제가 있다면 알려주세요!   


2018년 4월, UX 개선을 위해 크롬의 자동재생 정책이 아래와 같이 바뀌었다고 합니다. 즉, 아래의 경우에만 자동재생이 가능합니다. 

- 음소거인 경우
- 사용자 인터랙션(클릭, 탭 등)이 발생하는 경우
- 화이트리스트에 등록된 사이트: 사용자가 이전에 미디어를 자주 재생했거나, 수동으로 등록한 경우  
- 자동 재생 정책이 허용으로 지정되어 `<iframe>`과 document에서 자동 재생을 지원하는 경우 

하지만 저는 BGM의 자동재생과 끊기지 않고 쭉 재생되는 기능을 바랐기 때문에 사이트에 접속하자마자 사용자의 클릭을 유도했습니다. 
또 페이지가 바뀔 때마다 재생 중이던 곡의 정보를 유지하기 위해 리액트 리덕스를 사용해 state를 관리했습니다. 

(단, 중지를 눌렀어도 플레이리스트가 리렌더링 되면 다시 자동재생이 됩니다😂) 


## 오디오 생성자 함수
미리 utils.js에 `<audio>` 요소를 핸들링하기 위한 생성자 함수를 만들었습니다. 아래의 생성자 함수를 통해 만든 객체는 `useRef` 훅을 사용한 변수에 담아 관리했습니다.

페이지를 이동하지 않았음에도 컴포넌트가 리렌더링이 되면 안되기 때문이죠!  

```js
export function Audio(player, playlists) {
  this.player = player; // audio
  this.playlists = playlists;
  this.idx = 0;
  this.title = '';

  this.setCurTime = curTime => {
    this.player.currentTime = curTime;
  };

  // 재생정보 설정
  this.setCurrentSong = (idx, curTime) => {
    this.idx = idx;
    this.title = this.playlists[idx].dataset.title;
    this.player.src = `${publicUrl}/resources/audio/${this.title}.mp3`;
    this.setCurTime(curTime);
  };
}
```

## 자동재생 

자동재생을 위한 코드는 다음과 같습니다.

```js
const MusicPlayer = () => {
  // 현재 재생중인 곡의 정보를 담은 리덕스 스토어의 state 
  const { curSong } = useSelector(state => state.playlist);
  const dispatch = useDispatch();

  const audioRef = useRef(); // 리렌더링 방지

  useEffect(() => { 
    audioRef.current = new Audio(
      playerRef.current,
      playlistRef.current.childNodes,
    ); // 1
    const audio = audioRef.current;
    audio.setCurrentSong(curSong.idx, curSong.curTime); // 2

    const playPromise = audio.player.play(); // 3
    if (playPromise !== undefined) {
      playPromise.catch(e => { // 4
        if (e.name === 'NotAllowedError') {
          if (!isOpenModal) {
            setIsOpenModal(!isOpenModal); // 5
          }
        }
      });
    }
    
    // code... 

    // 6
    return () => {
      dispatch(
        setCurSong({
          idx: audio.idx,
          title: audio.title,
          curTime: audio.player.currentTime,
        }),
      );
    };
  }, []); // 빈 배열 전달 
}
```


1. 컴포넌트가 마운트 될 때 audio와 재생목록 DOM의 정보를 담은 객체를 생성 후 `audioRef.current`에 담았습니다.
2. 리덕스 스토어의 초기 state 값으로 플레이어의 정보를 업데이트 했습니다.
3. 이제 `play()` 메소드를 호출 해 오디오를 자동 재생합니다. `play()` 메소드의 반환값은 `Promise`이므로 자동 재생 성공/실패여부를 알 수 있습니다. 
4. 자동 재생 실패 시 `catch()` 핸들러를 통해 실패의 원인이 자동 재생 금지 퍼미션 때문인지, 즉 에러가 `NotAllowedError`인지 확인합니다. 
5. 재생 금지 에러인 경우 사용자 인터랙션 유도를 위한 모달을 렌더링합니다. 
6. 컴포넌트가 언마운트 될 때 즉, 다른 페이지로 이동하거나 재생 목록에서 다른 곡을 선택하거나, 재생중이던 곡이 종료되어 다음 곡으로 넘어가게 될 때 `dispatch`를 이용해 리덕스 스토어의 state에도 업데이트를 해줍니다. 

실제로 처음 사이트에 접속하자마자 모달이 뜨고, 사용자가 버튼을 클릭 시 BGM이 자동재생되며 사이트 이용이 가능해짐을 확인할 수 있습니다. 

![autoplay](../img/autoplay.gif)


## 재생위치 유지