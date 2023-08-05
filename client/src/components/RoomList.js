import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function RoomList({ handleBackgroundColor }) {
  const { chatrooms, setSelectorClosed, setSelectorVisible, joinRoom } =
    useContext(ChatContext);

  const handleButtonClick = (roomName) => {
    joinRoom(roomName);
    toggleSelector();
    handleBackgroundColor();
  };

  const toggleSelector = () => {
    setSelectorVisible(false);
    setSelectorClosed(true);
  };

  return (
    <>
      <div className='RoomList' data-testid='room-list'>
        <div>
          {chatrooms.map((chatroom) => {
            return (
              <button
                  className='RoomButton'
                  onClick={() => handleButtonClick(chatroom.name)}>
                  {chatroom.name}
                </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RoomList;
