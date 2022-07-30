import React from 'react';
import Background from './component/Background';
import HoverButton from './component/HoverButton/HoverButton';

function App() {
  return (
    <Background>
      <HoverButton direction="left">LEFT</HoverButton>
    </Background>
  );
}

export default App;
