// src/App.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from './Canvas';
import './App.css'; /* Import App-specific CSS */

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Canvas />
      </div>
    </DndProvider>
  );
};

export default App;
