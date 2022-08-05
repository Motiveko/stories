import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const Parent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  will-change: transform;
  /* 이걸 해줘야 mousemove시 target이 커스텀 커서로 안잡힌다. */
  pointer-events: none;
  transform: translate3d(var(--cursor-x), var(--cursor-y), 0);
  mix-blend-mode: difference;
  &.cursor-text-mode {
    mix-blend-mode: initial;
  }
  &.cursor-text-mode > div {
    background-color: #333;
  }
`;

const Child = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  pointer-events: none;
  will-change: transform;
  /* left: 0;
  top: 0; */
  border-radius: 50%;
  background-color: #fff;
  --cursor-scale: 1;
  /* transform: scale3d(var(--cursor-scale), var(--cursor-scale), 1); */
  transform: scale(var(--cursor-scale));
  transition: transform 100ms ease-in;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: var(--cursor-content);
    font-size: 0.5rem;
    transform: scale(0.45);
    white-space: nowrap;
    color: #fff;
  }
`;

let scale = 1;
let cursorType = '';

const CustomCursor: React.FC = () => {
  const parent = useRef<HTMLDivElement>(null);
  const child = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(window);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
  }, []);

  const mouseMove = (e: MouseEvent) => {
    console.log('mmmm');
    if (!parent.current || !child.current) return;
    const {pageX, pageY, target} = e;
    /**
     * offsetWidth/Height를 써야만 한다. DOMRect의 width/height를 쓰면 scale 적용에 따라 값이 바뀌는데, 이로 인해 scale 변화시 * 중심을 벗어나게된다. 따로 보정하지 않은 상태에서 scale을 해보면 어떠식으로 커지는지 알 수 있는데, scale은 이미 요소의 중심에서부터 상하좌우로 커지기 때문에 중심점이 움직이지 않는다. 따라서 요소 크기에 맟줘 보정해준 중심값은 요소 크기변화(scale)에 따라서 달라지면 안된다.
     */
    const {offsetWidth, offsetHeight} = child.current;
    // const {width, height} = child.current.getBoundingClientRect();

    // 커서 위치
    const cursorX = `${pageX - offsetWidth / 2}px`;
    const cursorY = `${pageY - offsetHeight / 2}px`;
    parent.current.style.setProperty('--cursor-x', cursorX);
    parent.current.style.setProperty('--cursor-y', cursorY);

    // content
    if (!target) return;

    const dataCursor = (target as HTMLElement).dataset['cursor'];

    let dataName = (target as HTMLElement).dataset['name'];

    // 요소에 적용된 커서 타입에 따라 커서 속성 변경
    switch (dataCursor) {
      case 'carousel':
        cursorType = 'carousel';
        scale = 5;
        const {width} = (target as HTMLElement).getBoundingClientRect();
        const {offsetX} = e;
        if (offsetX < width / 2) {
          dataName = '<< prev ';
        } else {
          dataName = ' next >>';
        }

        parent.current.classList.add('cursor-text-mode');
        child.current.style.setProperty('--cursor-scale', String(scale));
        parent.current.style.setProperty(
          '--cursor-content',
          `'${String(dataName)}'` || '',
        );
        break;
      case 'link':
        if (dataCursor === cursorType) return;
        cursorType = 'link';
        scale = 5;

        child.current.style.setProperty('--cursor-scale', String(scale));
        parent.current.style.setProperty(
          '--cursor-content',
          `'${String(dataName)}'` || '',
        );
        parent.current.classList.add('cursor-text-mode');
        break;
      case 'img':
        if (dataCursor === cursorType) return;
        cursorType = 'img';
        scale = 5;
        parent.current.classList.remove('cursor-text-mode');
        child.current.style.setProperty('--cursor-scale', String(scale));
        parent.current.style.setProperty('--cursor-content', '');
        break;
      default:
        if (dataCursor === cursorType) return;
        cursorType = '';
        scale = 1;
        parent.current.classList.remove('cursor-text-mode');
        child.current.style.setProperty('--cursor-scale', String(scale));
        parent.current.style.setProperty('--cursor-content', '');
    }
  };
  const mouseDown = (e: MouseEvent) => {
    if (!child.current) return;
    child.current.style.setProperty('--cursor-scale', String(scale * 0.8));
  };

  const mouseUp = (e: MouseEvent) => {
    if (!child.current) return;
    child.current.style.setProperty('--cursor-scale', String(scale));
  };

  return (
    <Parent ref={parent}>
      <Child ref={child} />
    </Parent>
  );
};

export default React.memo(CustomCursor);
