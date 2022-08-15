import React, {useRef, useCallback} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
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

  transition: all var(--timing) ease-in-out;
`;
const StyledText = styled.span`
  font-size: 30px;
  color: #00ffc6;
  pointer-events: none;
  transition: all 100ms ease-out;
`;

const VanillaMagnetButton: React.FC = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const timing = 45;
  const damper = -0.75;
  const damperingId = useRef<number>();

  const onMouseMove: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    e => {
      if (damperingId.current) {
        clearInterval(damperingId.current);
        damperingId.current = undefined;
      }
      const button = buttonRef.current;
      const text = textRef.current;
      if (!button || !text) {
        return;
      }
      button.style.setProperty('--timing', `${timing}ms`);

      const {clientHeight, clientWidth, offsetLeft, offsetTop} = button;
      const {pageX, pageY} = e.nativeEvent;

      const [centerX, centerY] = [
        pageX - offsetLeft - clientWidth / 2,
        pageY - offsetTop - clientHeight / 2,
      ];

      button.style.setProperty('--transX', `${centerX / 1.5}px`);
      button.style.setProperty('--transY', `${centerY / 1.5}px`);
      const d = Math.sqrt(centerX ** 2 + centerY ** 2);
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
      let transX = Number(
        button.style.getPropertyValue('--transX').replace('px', ''),
      );
      let transY = Number(
        button.style.getPropertyValue('--transY').replace('px', ''),
      );

      damperingId.current = window.setInterval(() => {
        transX *= damper;
        transY *= damper;

        if (Math.abs(transX) < 1 && Math.abs(transY) < 1) {
          button.style.setProperty('--transX', `0`);
          button.style.setProperty('--transY', `0`);
          clearInterval(damperingId.current);
          damperingId.current = undefined;
        }
        button.style.setProperty('--transX', `${transX}px`);
        button.style.setProperty('--transY', `${transY}px`);
      }, timing + 5);
      text.style.transform = '';
    }, [damper]);

  return (
    <StyledButton
      ref={buttonRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <StyledText ref={textRef}>HOVER</StyledText>
    </StyledButton>
  );
};

export default VanillaMagnetButton;

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
