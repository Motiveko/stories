import React from 'react';
import styled from 'styled-components';

const BackgroundWrap = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-family: 'Black Han Sans', sans-serif;
  background-color: #2f2f2f;
  font-size: 2rem;
`;
const Background: React.FC = ({children}) => {
  return <BackgroundWrap>{children}</BackgroundWrap>;
};

export default Background;
