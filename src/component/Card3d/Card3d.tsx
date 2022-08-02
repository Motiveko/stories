/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {useRef} from 'react';
import styled from 'styled-components';
import img from '../Card3d/background.jpg';

const TILT_DEGREE = 25;
const Frame = styled.div`
  width: 300px;
  height: 450px;
`;
type CradProps = {
  img: string;
};
const Card = styled.div<CradProps>`
  background-image: ${props => `url(${props.img})`};
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: transform 110ms;
  transform: rotate3d(var(--tiltX), var(--tiltY), 0, var(--tiltDegree));
  box-shadow: var(--shadowX) var(--shadowY) 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
`;

const Light = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid grey;
  top: 0;
  left: 0;
  background-image: radial-gradient(
    circle at var(--centerX) var(--centerY),
    #cccccc02,
    #dddddd00,
    #ffffff30
  ); ;
`;
const initCssVariables = (element: HTMLElement) => {
  element.style.setProperty('--tiltX', '0');
  element.style.setProperty('--tiltY', '0');
  element.style.setProperty('--tiltDegree', '0');
  element.style.setProperty('--shadowX', '0px');
  element.style.setProperty('--shadowY', '0px');
  element.style.setProperty('--centerX', '0px');
  element.style.setProperty('--centerY', '0px');
};

const getPytagoras: (x: number, y: number) => number = (x, y) =>
  Math.sqrt(x * x + y * y);

const Card3d: React.FC = () => {
  const card = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = event => {
    if (!card.current) return;

    const {width, height} = card.current.getBoundingClientRect();
    const {offsetX, offsetY} = event.nativeEvent; // 이벤트 핸들러가 등록된 요소로부터 마우스 포인터까지의 상대 거리
    const [centerX, centerY] = [offsetX - width / 2, offsetY - height / 2];
    const [tiltX, tiltY] = [-centerY, centerX];

    card.current.style.setProperty('--centerX', `${offsetX}px`);
    card.current.style.setProperty('--centerY', `${offsetY}px`);

    const tiltDegree =
      (getPytagoras(tiltX, tiltY) / getPytagoras(width / 2, height / 2)) *
      TILT_DEGREE;

    card.current.style.setProperty('--tiltX', String(tiltX));
    card.current.style.setProperty('--tiltY', String(tiltY));
    card.current.style.setProperty('--tiltDegree', `${tiltDegree}deg`);

    const [shadowX, shadowY] = [-centerX / 6, -centerY / 6];
    card.current.style.setProperty('--shadowX', `${shadowX}px`);
    card.current.style.setProperty('--shadowY', `${shadowY}px`);
  };

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = event => {
    if (!card.current) return;

    initCssVariables(card.current);
  };

  return (
    <Frame>
      <Card
        img={img}
        ref={card}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <Light ref={light} />
      </Card>
    </Frame>
  );
};

export default Card3d;
