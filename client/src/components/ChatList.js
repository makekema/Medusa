import { ChatContext } from '../context/ChatContext';
import { useContext } from 'react';
import ChatBox from './ChatBox';

function ChatList({ handleBackgroundColor }) {
  const { roomLists, socket } = useContext(ChatContext);

  const index = roomLists.findIndex((list) => list.socketId === socket.id);

  if (index === -1) {
    return;
  }

  return (
    <>
      <div>
        {roomLists[index].rooms.map((room) => (
          <div className='ChatList' key={room.name}>
            <ChatBox
              key={room._id}
              room={room.name}
              socket={socket}
              handleBackgroundColor={handleBackgroundColor}></ChatBox>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatList;
