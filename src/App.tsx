import React from 'react';
import GlobalStyle from './component/Background';
import RippleButton from './component/RippleButton/RippleButton';

function App() {
  return (
    <>
      <GlobalStyle />
      <RippleButton>CLICK</RippleButton>
    </>
  );
}

export default App;
