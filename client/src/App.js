import './index.css';
import RoomList from './components/RoomList';
import RoomSelector from './components/RoomSelector';
import ChatBoxList from './components/ChatBoxList';
import Marquee from 'react-fast-marquee';
import { useState } from 'react';

const colors = [
  'rgb(210, 185, 31)',
  'rgb(37,73,155)',
  'rgb(130,125,188',
  'rgb(244,90,51)',
  'rgb(217,117,117)',
];

function App () {
  const [bgColor, setBgColor] = useState(colors[0]);

  function handleBackgroundColor () {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }

  return (
    <>
      <div className='App' style={{ backgroundColor: bgColor }}>
        <div className='room-list-container'>
          <div
            className='RoomListMarquee'
            style={{ background: 'rgb(182,182,182)', color: 'rgb(15,11,39)' }}>
            <Marquee pauseOnHover={true} speed={50}>
              <RoomList
                handleBackgroundColor={handleBackgroundColor}></RoomList>
            </Marquee>
            <Marquee pauseOnHover={true} speed={25}>
              <RoomList
                handleBackgroundColor={handleBackgroundColor}></RoomList>
            </Marquee>
          </div>
        </div>
        <RoomSelector
          handleBackgroundColor={handleBackgroundColor}></RoomSelector>
      </div>
      <ChatBoxList handleBackgroundColor={handleBackgroundColor}></ChatBoxList>
    </>
  );
}

export default App;
