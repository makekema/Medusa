import { ChatContext } from '../context/ChatContext';
import React, { useContext } from 'react';
import { ChatBox } from './ChatBox/ChatBox';
import { ChatContextType } from '../context/ContextTypes';

type IChatBoxListProps = {
  handleBackgroundColor: () => void;
};

export default function ChatBoxList ({ handleBackgroundColor }: IChatBoxListProps) {
  const { userRoomList } = useContext(ChatContext) as ChatContextType;

  return (
    <>
      <div>
        {userRoomList.rooms?.map((room) => (
          <div className="ChatList" key={room.name}>
            <ChatBox
              key={room.name}
              roomName={room.name}
              socketId={userRoomList.socketId}
              handleBackgroundColor={handleBackgroundColor}></ChatBox>
          </div>
        ))}
      </div>
    </>
  );
}