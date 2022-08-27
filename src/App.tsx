import React from 'react';
import ImageGrid, {ImageGridGlobalStyle} from './component/ImageGrid/ImageGrid';

function App() {
  return (
    <>
      <ImageGridGlobalStyle />
      <ImageGrid />
      <ImageGrid animationType="backward" />
      <ImageGrid animationType="toBottom" />
      <ImageGrid animationType="toRight" />
    </>
  );
}

export default App;
