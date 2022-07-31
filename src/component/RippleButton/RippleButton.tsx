import React, {useRef} from 'react';
import styled from 'styled-components';

type RippleProps = {
  color?: string;
};

const Button = styled.button<RippleProps>`
  font-family: roboto;
  letter-spacing: 1px;
  padding: 1rem 5rem;
  border-radius: 9px;
  border: none;
  font-size: 1.5rem;
  color: #eaeaea;
  font-weight: bold;
  background-color: #ff2e63;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0 0.5);
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &::after {
    content: ' ';
    position: absolute;
    background-color: ${props =>
      props.color ? props.color : `rgba(0, 0, 0, 0.1)`};
    border-radius: 50%;
    top: var(--centerY);
    left: var(--centerX);
    width: var(--diameter);
    height: var(--diameter);
    transform: scale(0);
    pointer-events: none;
    animation: var(--animation);
  }

  @keyframes ripple {
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
const RippleButton: React.FC<RippleProps> = ({children, ...props}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (!buttonRef.current) return;
    const {top, left, width, height} =
      buttonRef.current.getBoundingClientRect();
    const diameter = Math.sqrt(width * width + height * height) * 2;

    buttonRef.current.style.setProperty('--diameter', `${diameter}px`);

    const {clientX, clientY} = event;
    const centerX = clientX - left - diameter / 2;
    const centerY = clientY - top - diameter / 2;
    buttonRef.current.style.setProperty('--centerX', `${centerX}px`);
    buttonRef.current.style.setProperty('--centerY', `${centerY}px`);
    buttonRef.current.style.setProperty('--animation', ``);
    setTimeout(() => {
      buttonRef.current?.style.setProperty(
        '--animation',
        `ripple 500ms ease-out`,
      );
    });
  };
  return (
    <Button {...props} ref={buttonRef} onClick={onClick}>
      {children}
    </Button>
  );
};

export default RippleButton;
