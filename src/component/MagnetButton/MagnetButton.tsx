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
`;
const StyledText = styled.span`
  font-size: 30px;
  color: #00ffc6;
  pointer-events: none;
`;
const MagnetButton: React.FC = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const onMouseMove: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    e => {
      const button = buttonRef.current;
      const text = textRef.current;
      if (!button || !text) {
        return;
      }
      const {clientHeight, clientWidth} = button;
      // const {top, left} = button.getBoundingClientRect();
      const {clientX, clientY} = e;
      const [centerX, centerY] = [
        clientX - clientWidth / 2,
        clientY - clientHeight / 2,
      ];

      // button.style.setProperty('--transX', `${centerX / 2}px`);
      // button.style.setProperty('--transY', `${centerX / 2}px`);
      console.log(centerX, centerY);
    },
    [],
  );

  return (
    <StyledButton ref={buttonRef} onMouseMove={onMouseMove}>
      <StyledText ref={textRef}>GET IN TOUCH</StyledText>
    </StyledButton>
  );
};

export default MagnetButton;

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
