/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {faker} from '@faker-js/faker';

// const black = '#46494c';
const gray = '#c5c3c6';
const white = '#dcdcdd;';
const dBlue = '#2b4466';

const width = 100;
const StyledCard = styled.div`
  background: ${white};
  /* min-height: calc(100vh - 40px); */
  height: 120px;
  overflow: hidden;

  position: absolute;
  width: ${width}%;
  left: 0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  transition: left 300ms ease-in-out, width 300ms ease-in-out,
    top 300ms ease-in-out;
  h3 {
    color: ${dBlue};
    font-size: 1.2rem;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;
const CardHeadr = styled.section`
  border-radius: 5px 5px 0 0;
  background: ${gray};
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 10px;
`;
const CardContent = styled.section`
  padding: 20px 20px 0;
  text-align: center;

  .card-close {
    color: ${dBlue};
    font-size: 1.2rem;
  }
  p {
    font-size: 0.8rem;
    line-height: 1.6;
    text-align: left;
  }
`;
type CardProps = {
  data: CardData;
  onClose: (id: string) => void;
  backRatio: number;
};

const Card: React.FC<CardProps> = ({data, onClose, backRatio}) => {
  const {id, header, content} = data;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.style.left = `${backRatio}%`;
    ref.current.style.width = `${width - 2 * backRatio}%`;
    ref.current.style.top = `${-backRatio * 6}px`;
  }, [backRatio]);
  return (
    <StyledCard ref={ref}>
      <CardHeadr>
        <h3>{header}</h3>
        <a
          className="card-close"
          data-close-id={id}
          onClick={e => {
            e.preventDefault();
            onClose(id);
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </a>
      </CardHeadr>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </StyledCard>
  );
};

const Container = styled.div`
  position: relative;
  /* min-height: 100%; */
  width: 100%;
  height: 300px;
  /* overflow: hidden; */
`;
const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 50px;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 5rem;
  bottom: 2rem;
  border: none;
  padding: 0.5rem 1rem;
  background-color: lightblue;
  border-radius: 5px;
  cursor: pointer;
`;
const Button: React.FC<{onClick: () => void}> = ({children, onClick}) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

class CardData {
  id: string;
  header: string;
  content: string;
  constructor() {
    this.id = faker.datatype.uuid();
    this.header = `Card ${faker.word.noun()}`;
    this.content = faker.lorem.paragraphs();
  }
}
const MAX_RENDER_COUNT = 5;

/**
 * TODO : Card 랜더링시 샥 올라오는 효과 추가, renderStartIndex 밖에 버퍼로 몇개정도는 랜더링 시키는대신, opacity등을 활용해서 보이지는 않게하자. 그리고 앞에 애가 없어지면서 renderStartIndex에 들어오면 스르르 나타나도록..
 */
const StackedCard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([new CardData()]);
  const addCard = useCallback(() => {
    setCards(prev => [...prev, new CardData()]);
  }, []);
  const removeCard = useCallback((closeId: string) => {
    setCards(prev => prev.filter(({id}) => id !== closeId));
  }, []);

  const renderStartIndex = useMemo(
    () => cards.length - MAX_RENDER_COUNT,
    [cards.length],
  );

  return (
    <>
      <Root>
        <Container>
          {cards.map((card, i) => {
            if (i < renderStartIndex) {
              return null;
            }
            const backRatio = cards.length - 1 - i;
            return (
              <Card
                data={card}
                backRatio={backRatio}
                key={card.id}
                onClose={removeCard}
              />
            );
          })}
        </Container>
      </Root>
      <Button onClick={addCard}>Add Card</Button>
    </>
  );
};

export default StackedCard;
