import React, {useEffect, useRef} from 'react';
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
  --box-height: 30rm;
  --frag-width: calc(var(--box-width) / var(--col));
  --frag-height: calc(var(--box-height) / var(--row));
  --img-url: url('https://djjjk9bjm164h.cloudfront.net/leather01.jpg');

  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: var(--box-width);
  height: var(--box-height);
  border: 1px solid #f1f1f1;
`;

// const Fragment = styled.div`
//   box-sizing: border-box;
// `;

type ImageGridProps = {
  row?: number;
  column?: number;
};
const ImageGrid: React.FC<ImageGridProps> = ({row = 15, column = 10}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }
    const card = cardRef.current;

    // row, col
    card.style.setProperty('--col', String(column));
    card.style.setProperty('--row', String(row));
  }, [column, row]);
  const animate = () => {
    if (!cardRef.current) {
      return;
    }
  };
  return (
    <Card onClick={animate} ref={cardRef}>
      grid
    </Card>
  );
};

export default ImageGrid;
