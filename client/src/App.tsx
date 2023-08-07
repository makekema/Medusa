import './index.css';
import { useState } from 'react';
import ChatBoxContainer from './components/ChatBoxContainer/ChatBoxContainer';
import ChatroomManager from './components/ChatRoomManager/ChatRoomManager';

const colors = [
  'rgb(210, 185, 31)',
  'rgb(37,73,155)',
  'rgb(130,125,188',
  'rgb(244,90,51)',
  'rgb(217,117,117)',
];

function App() {
  const [bgColor, setBgColor] = useState(colors[0]);

  function handleBackgroundColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }

  return (
    <>
      <div className='App' style={{ backgroundColor: bgColor }}>
        <ChatroomManager handleBackgroundColor={handleBackgroundColor} />
      </div>
      <ChatBoxContainer
        handleBackgroundColor={handleBackgroundColor}></ChatBoxContainer>
    </>
  );
}

export default App;
