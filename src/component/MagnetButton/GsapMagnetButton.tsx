import React, {useRef, useCallback} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import gsap, {Elastic} from 'gsap';
import './reset.css';
const StyledButton = styled.a`
  background-color: #7319ff;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate3d(var(--transX), var(--transY), 0);
  cursor: pointer;
`;
const StyledText = styled.span`
  font-size: 30px;
  color: #00ffc6;
  pointer-events: none;
  transition: all 100ms ease-out;
`;

type GsapMagnetButtonProps = {
  label: string;
};

const GsapMagnetButton: React.FC<GsapMagnetButtonProps> = ({label}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const onMouseMove: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    e => {
      const button = buttonRef.current;
      const text = textRef.current;
      if (!button || !text) {
        return;
      }

      const {clientHeight, clientWidth, offsetLeft, offsetTop} = button;
      const {pageX, pageY} = e.nativeEvent;

      const [centerX, centerY] = [
        pageX - offsetLeft - clientWidth / 2,
        pageY - offsetTop - clientHeight / 2,
      ];
      const d = Math.sqrt(centerX ** 2 + centerY ** 2);

      // TODO : gsap
      gsap.to(button, {
        duration: 0.5,
        x: centerX / 1.5,
        y: centerY / 1.5,
        ease: Elastic.easeOut,
      });

      text.style.transform = `
      translate3d(${centerX / 4}px, ${centerY / 4}px, 0)
      rotate3d(${-centerY / 100}, ${centerX / 100}, 0, ${d / 10}deg)
    `;
    },
    [],
  );
  const onMouseLeave: React.MouseEventHandler<HTMLAnchorElement> =
    useCallback(() => {
      const button = buttonRef.current;
      const text = textRef.current;
      if (!button || !text) {
        return;
      }
      // TODO : gsap
      gsap.to(button, {
        duration: 1.2,
        x: 0,
        y: 0,
        ease: Elastic.easeOut.config(1, 0.1),
      });
      text.style.transform = '';
    }, []);

  return (
    <StyledButton
      ref={buttonRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <StyledText ref={textRef}>{label}</StyledText>
    </StyledButton>
  );
};

export default GsapMagnetButton;

export const MagnetButtonBackground = createGlobalStyle`
html, body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  font-family: 'Raleway', serif;
}
`;
