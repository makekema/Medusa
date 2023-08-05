import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';


function RoomList ({ handleBackgroundColor }) {
  const { chatrooms, setSelectorClosed, setSelectorVisible, joinRoom } = useContext(ChatContext);

  const handleButtonClick = (roomName) => {
    joinRoom(roomName);
    toggleSelector(roomName);
    handleBackgroundColor();
  };

  const toggleSelector = () => {
    setSelectorVisible(false);
    setSelectorClosed(true);
  };

  return (
    <>
      <div className='RoomList'>
        <div>
          {chatrooms.map((chatroom) => {
            return (
              <button
                className='RoomButton'
                key={chatroom._id}
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
