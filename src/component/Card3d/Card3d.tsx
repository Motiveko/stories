/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {useRef} from 'react';
import styled from 'styled-components';
import img from '../Card3d/background.jpg';

const TILT_DEG = 25;
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
  transition: transform 60ms;
  transform: rotate3d(var(--tiltX), var(--tiltY), 0, var(--deg));
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

const Card3d: React.FC = () => {
  const card = useRef<HTMLDivElement>(null);
  const light = useRef<HTMLDivElement>(null);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    console.log(e);
    if (!card.current) return;

    const {top, left, width, height} = card.current.getBoundingClientRect();
    const {clientX, clientY} = e;

    const centerX = clientX - left - width / 2;
    const centerY = clientY - top - height / 2;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    card.current.style.setProperty('--centerX', `${x}px`);
    card.current.style.setProperty('--centerY', `${y}px`);
    const tiltY = centerX;
    const tiltX = -centerY;
    const deg =
      (Math.sqrt(tiltX * tiltX + tiltY * tiltY) /
        Math.sqrt((width * width) / 4 + (height * height) / 4)) *
      TILT_DEG;

    card.current.style.setProperty('--tiltX', String(tiltX));
    card.current.style.setProperty('--tiltY', String(tiltY));
    card.current.style.setProperty('--deg', `${deg}deg`);

    const shadowX = -centerX / 6;
    const shadowY = -centerY / 6;
    card.current.style.setProperty('--shadowX', `${shadowX}px`);
    card.current.style.setProperty('--shadowY', `${shadowY}px`);
  };

  return (
    <Frame>
      <Card img={img} ref={card} onMouseMove={onMouseMove}>
        <Light ref={light} />
      </Card>
    </Frame>
  );
};

export default Card3d;
