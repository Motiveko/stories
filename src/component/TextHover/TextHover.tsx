import React from 'react';

import styled, {css} from 'styled-components';

type Direction = 'right' | 'left' | 'centerX' | 'centerY' | 'top' | 'buttom';

type ButtonProps = {
  direction: Direction;
};
const StyledButton = styled.span<ButtonProps>`
  cursor: pointer;
  -webkit-text-stroke: 1px #f9f7f1;
  background-image: linear-gradient(0deg, #f9f7f1, #f9f7f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-repeat: no-repeat;
  transition: background-size 0.2s ease-in;
  ${props => {
    switch (props.direction) {
      case 'left':
        return css`
          background-position: 0% 0%;
          background-size: 0% 100%;
        `;
      case 'right':
        return css`
          background-position: 100% 0%;
          background-size: 0% 100%;
        `;
      case 'top':
        return css`
          background-position: 0% 0%;
          background-size: 100% 0%;
        `;
      case 'buttom':
        return css`
          background-position: 0% 100%;
          background-size: 100% 0%;
        `;
      case 'centerY':
        return css`
          background-position: 0% 50%;
          background-size: 100% 0%;
        `;
      case 'centerX':
      default:
        return css`
          background-position: 50% 0%;
          background-size: 0% 100%;
        `;
    }
  }}

  &:hover {
    background-size: 100% 100%;
    filter: drop-shadow(0 0 5px #f9f7f1);
  }
`;
type HoverButtonProps = {
  direction: Direction;
};
const TextHover: React.FC<HoverButtonProps> = ({direction, children}) => {
  return <StyledButton direction={direction}>{children}</StyledButton>;
};
export default TextHover;
