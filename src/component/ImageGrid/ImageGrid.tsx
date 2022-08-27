import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';

// const styledCard = styled

type AnimationType =
  | 'forward'
  | 'backward'
  | 'toBottom'
  | 'toRight'
  | 'crossDown'
  | 'crossUp'
  | 'spreadOut';
type ImageGridProps = {
  row?: number;
  column?: number;
  animationType?: AnimationType;
  tick?: number;
};
const ImageGrid: React.FC<ImageGridProps> = ({
  row = 15,
  column = 10,
  animationType = 'forward',
  tick = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fragments, setFragments] = useState<React.ReactElement[]>([]);

  const animate = useCallback(() => {
    if (!cardRef.current) {
      return;
    }
    const card = cardRef.current;
    card.className += ' hide';
    const _fragments = [];
    // row, col
    card.style.setProperty('--col', String(column));
    card.style.setProperty('--row', String(row));

    for (let j = 0; j < row; j++) {
      for (let i = 0; i < column; i++) {
        /**
         * TODO  style.setProperty를 호출할 수가 없는데... Element vs ReactElement vs HTMLElement
         * https://betterprogramming.pub/typescript-reactjs-the-element-vs-reactelement-vs-htmlelement-vs-node-confusion-6cda21315ddd
         */
        const isOdd = (i + j) % 2 === 0;
        const delay = getDelay({
          i,
          j,
          column,
          row,
          animationType,
          offset: 0,
          tick,
        });
        const fragment = (
          <Fragment
            key={`${Math.random()}`}
            x={i}
            y={j}
            isOdd={isOdd}
            delay={delay}
            duration={500}
          />
        );
        _fragments.push(fragment);
      }
    }
    setFragments(_fragments);
  }, [animationType, column, row, tick]);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }
    // animate();
  }, [animate, column, row]);

  const onClick = () => {
    setFragments([]);
    setTimeout(() => animate());
  };

  const title = useMemo(() => {
    return animationType.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
  }, [animationType]);

  return (
    <Card onClick={onClick} ref={cardRef} data-title={title}>
      {fragments}
    </Card>
  );
};
export const ImageGridGlobalStyle = createGlobalStyle`
  html body {
    background-color: #121212;
    font-size: 16px;
    font-weight: bold;
    color: #aaa;
    font-family: 'Quicksand', serif;
  }
  #root {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  @media (max-width: 800px) {
    html, body {
      font-size: 13px;
    }
  }
  @media (max-width: 650px) {
    html, body {
      font-size: 10px;
    }
  }
`;

const Card = styled.div`
  --box-width: 20rem;
  --box-height: 30rem;
  --frag-width: calc(var(--box-width) / var(--col));
  --frag-height: calc(var(--box-height) / var(--row));
  --img-url: url('https://djjjk9bjm164h.cloudfront.net/leather01.jpg');

  display: flex;
  flex-wrap: wrap;
  width: var(--box-width);
  height: var(--box-height);
  /* border-box해서 320px 되서 딱맞으면 안들어간다. 왜? */
  box-sizing: border-box;
  /* border: 1px solid #f1f1f1; */
  cursor: pointer;
  position: relative;
  margin-top: 5rem;

  &::after {
    content: 'CLICK ME';
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 2.2rem;
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-linear-gradient */
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(100, 100, 100, 0.25),
      rgba(100, 100, 100, 0.25) 1px,
      transparent 1px,
      transparent 6px
    );
    background-size: 4px 4px;
  }

  /* after에 hover하려면 :hover::after로 해야한다. ::after:hover는 먹지 않는다. */
  &:hover::after {
    transition: transform 300ms;
    transform: scale(1.2);
    background: initial;
  }
  &.hide::after {
    content: '';
    width: 0;
    height: 0;
  }

  &::before {
    content: attr(data-title);
    position: absolute;
    text-align: center;
    width: 100%;
    top: calc(100% + 15px);
    font-size: 1.5rem;
  }
`;

const StyledFragment = styled.div`
  box-sizing: border-box;
  width: var(--frag-width);
  height: var(--frag-height);
  /* border: 1px solid red; */

  background-image: var(--img-url);
  background-repeat: no-repeat;
  background-size: var(--box-width) var(--box-height);
  background-position: calc(var(--frag-width) * var(--x) * -1)
    calc(var(--frag-height) * var(--y) * -1);
  backface-visibility: hidden;
  will-change: transform;
  transform: scale(0);
  /* transform: scale(1) rotateX(0deg); */
  animation: flip var(--duration) linear var(--delay) forwards;

  @keyframes flip {
    from {
      transform: scale(0) rotateX(var(--rotateX)) rotateY(var(--rotateY));
    }
    to {
      transform: scale(1) rotateX(0deg) rotateY(0deg);
    }
  }
`;

type FragmentProps = {
  x: number;
  y: number;
  isOdd: boolean;
  delay: number;
  duration: number;
};
const Fragment: React.FC<FragmentProps> = ({x, y, isOdd, delay, duration}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    /**
     * TODO : 여기도 한번 랜더링하고 ref 얻어서 native DOM API를 호출하는 방식이 되고 있따. 당연히 성능상 안좋을듯.
     * 1. React.RefObject<HTMLDivElement> 타입에 대해 조사하기
     * 2. JSX.Element(React.ReactElement)에서 바로 nativeAPI 호출하는 방법...은 없으려나?
     * */
    const rotateX = isOdd ? '-180deg' : '0';
    const rotateY = !isOdd ? '-180deg' : '0';
    ref.current.style.setProperty('--x', String(x));
    ref.current.style.setProperty('--y', String(y));
    ref.current.style.setProperty('--delay', `${delay}ms`);
    ref.current.style.setProperty('--duration', `${duration}ms`);
    ref.current.style.setProperty('--rotateX', rotateX);
    ref.current.style.setProperty('--rotateY', rotateY);
  }, [delay, duration, isOdd, x, y]);
  return <StyledFragment ref={ref} />;
};
type GetDelayProps = {
  i: number;
  j: number;
  column: number;
  row: number;
  animationType: AnimationType;
  offset: number;
  tick?: number;
};
const getDelay: (props: GetDelayProps) => number = ({
  i,
  j,
  column,
  row,
  animationType,
  offset,
  tick = 15,
}) => {
  switch (animationType) {
    case 'forward':
      return offset + (i + j * column) * tick;
    case 'backward':
      return offset + (column - i + (row - j) * column) * tick;
    case 'toBottom':
      return offset + (j * tick * column) / 1.2;
    case 'toRight':
      return offset + (i * tick * row) / 1.2;
    case 'crossDown':
      return offset + ((i + j) * tick) / 1.2;
    case 'crossUp':
      return offset + ((column + row - i - j - 2) * tick) / 1.2;
    case 'spreadOut':
      const [centerX, centerY] = [Math.floor(column / 2), Math.floor(row / 2)];
      return (
        offset + ((Math.abs(centerX - i) + Math.abs(centerY - j)) * tick) / 1.2
      );
  }
  return 0;
};

export default ImageGrid;
