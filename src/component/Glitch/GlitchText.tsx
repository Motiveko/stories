import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  &::before {
    content: '';
  }

  &::after {
    content: '';
  }
`;

type GlitchTextProps = {
  label: string;
};
const GlitchText: React.FC<GlitchTextProps> = ({label}) => {
  return <StyledH1>{label}</StyledH1>;
};

export default GlitchText;
