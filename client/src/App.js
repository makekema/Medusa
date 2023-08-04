import './index.css';
import RoomList from './components/RoomList';
import RoomSelector from './components/RoomSelector';
import ChatList from './components/ChatList';
import Marquee from 'react-fast-marquee';
import { useContext } from 'react';
import { ChatContext } from './context/ChatContext';

const colors = [
  'rgb(210, 185, 31)',
  'rgb(37,73,155)',
  'rgb(130,125,188',
  'rgb(244,90,51)',
  'rgb(217,117,117)',
];

function App() {
  const { bgColor, setBgColor } = useContext(ChatContext);

  function handleBackgroundColor() {
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
      <ChatList handleBackgroundColor={handleBackgroundColor}></ChatList>
      {/* <div className="page-border"></div> */}
    </>
  );
}

export default App;

// background: 'rgb(182,182,182)',
