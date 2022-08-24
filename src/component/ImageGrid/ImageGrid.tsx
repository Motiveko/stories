import React, {useEffect, useRef, useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';

// const styledCard = styled

export const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #121212;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    font-size: 16px;
    font-weight: bold;
    color: #aaa;
    font-family: 'Quicksand', serif;
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
  /* box-sizing: border-box; */
  border: 1px solid #f1f1f1;
`;

const StyledFragment = styled.div`
  box-sizing: border-box;
  width: var(--frag-width);
  height: var(--frag-height);
  border: 1px solid red;

  background-image: var(--img-url);
  background-repeat: no-repeat;
  background-size: var(--box-width) var(--box-height);
  background-position: calc(var(--frag-width) * var(--x) * -1)
    calc(var(--frag-height) * var(--y) * -1);
`;

type FragmentProps = {
  x: number;
  y: number;
};
const Fragment: React.FC<FragmentProps> = ({x, y}) => {
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
    ref.current.style.setProperty('--x', String(x));
    ref.current.style.setProperty('--y', String(y));
  }, [x, y]);
  return <StyledFragment ref={ref} />;
};
type ImageGridProps = {
  row?: number;
  column?: number;
};
const ImageGrid: React.FC<ImageGridProps> = ({row = 15, column = 10}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fragments, setFragments] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }
    const card = cardRef.current;
    const _fragments = [];
    // row, col
    card.style.setProperty('--col', String(column));
    card.style.setProperty('--row', String(row));
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        /**
         * TODO  style.setProperty를 호출할 수가 없는데... Element vs ReactElement vs HTMLElement
         * https://betterprogramming.pub/typescript-reactjs-the-element-vs-reactelement-vs-htmlelement-vs-node-confusion-6cda21315ddd
         */
        const fragment = <Fragment key={`${i},${j}`} x={j} y={i} />;

        _fragments.push(fragment);
        setFragments(_fragments);
      }
    }
  }, [column, row]);
  const animate = () => {
    if (!cardRef.current) {
      return;
    }
  };
  return (
    <Card onClick={animate} ref={cardRef}>
      {fragments}
    </Card>
  );
};

export default ImageGrid;
