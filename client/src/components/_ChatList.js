import { ChatContext } from '../context/ChatContext';
import React, { useContext } from 'react';
import { ChatBox } from './ChatBox';

function ChatList ({ handleBackgroundColor }) {
  const { userRoomList } = useContext(ChatContext);


  return (
    <>
      <div>
        {userRoomList.rooms?.map((room) => (
          <div className="ChatList" key={room.name}>
            <ChatBox
              key={room._id}
              room={room.name}
              socketId={userRoomList.socketId}
              handleBackgroundColor={handleBackgroundColor}></ChatBox>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChatList;
