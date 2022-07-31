import React from 'react';
import Background from './component/Background';
import HoverButton from './component/TextHover/TextHover';

function App() {
  return (
    <Background>
      <HoverButton direction="left">LEFT</HoverButton>
    </Background>
  );
}

export default App;
