# 스크롤 상단 초기화

리액트는 `SPA(Single Page Application)`입니다. 싱글 페이지라고 해서 꼭 한 페이지만 있는 것은 아니고 여러 페이지가 있을 수 있으나, `react-router`를 통해 다른 주소에 따라 다른 페이지를 보여주는 라우팅을 해야 합니다.

하지만 이는 여전히 여러 페이지로 구성되어 매번 페이지를 새로고침 하며, 자원을 서버로부터 전달받아 렌더링하는 방식과 구분됩니다. 때문에 메뉴나 탭을 클릭하여 페이지를 이동해도 실제로는 페이지를 이동하는 게 아니기 때문에 이전 페이지의 스크롤 위치가 그대로 남아있게 됩니다.

따라서 페이지의 주소가 바뀔 때마다 스크롤을 최상단으로 초기화하기 위해 ScrollToTop 컴포넌트를 만들었습니다.  

```js
const ScrollToTop = ({ path, children }) => { // 1
  const scrollRef = useRef(); // 2

  useEffect(() => {
    scrollRef.current.scrollTop = 0;
  }, [path]); // 3

  return <Wrapper ref={scrollRef}>{children}</Wrapper>;
};
```

1. `props` 중 children이 실제 스크롤이 생기는 영역이고, path가 url의 파라미터 값입니다. 미니포트폴리의 레이아웃 특성상 여러 `<div>`들이 겹겹이 쌓여있어, 스크롤이 생기는 컴포넌트 바로 위에서 ScrollToTop 컴포넌트를 적용해야 했습니다.   
> url path 규칙은 아래와 같습니다. `type`에 해당하는 파라미터 값이 `props`에 담기게 됩니다. 
>- `${match.path}/intro/:type`
2. 스크롤을 제어하기 위해 `useRef` 훅을 이용해 `<div>` DOM을 변수에 담아둡니다. 
3. 그리고 `useEffect` 훅의 배열에 전달받은 path를 넣어주면, path가 바뀔 때마다(페이지 주소가 바뀔 때마다) 훅 안의 코드를 실행하게 됩니다. 

👉 결과입니다! 
![◽scrollToTop](../img/scroll.gif)