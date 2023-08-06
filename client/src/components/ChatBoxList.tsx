import { ChatContext } from '../context/ChatContext';
import React, { useContext, useEffect, useState } from 'react';
import { ChatBox } from './ChatBox/ChatBox';
import { ChatContextType } from '../context/ContextTypes';
import { createNewMessage, DEFAULT_MESSAGE } from './helper';
import { socket } from '../socket';
import { Message } from './types';

type IChatBoxListProps = {
  handleBackgroundColor: () => void;
};

export default function ChatBoxList ({ handleBackgroundColor }: IChatBoxListProps) {
  const { userRoomList } = useContext(ChatContext) as ChatContextType;
  const [messageList, setMessageList] = useState<Message[]>([]);

  const sendMessage = (roomName: string, message: string) => {
    if (roomName !== '' && message !== '') {
      const newMessage = createNewMessage(socket.id, message, roomName);
      socket.emit("send_message", newMessage);
      setMessageList((list) => [...list, newMessage]);
    }
  };

  useEffect(() => {
    socket.on('receive_message', (message: Message) => {
      setMessageList((prevList: Message[]) => [...prevList, message]);
    });

    socket.on('joined_empty_room', (data) => {
      const message = createNewMessage(socket.id, DEFAULT_MESSAGE, data.room);
      setMessageList((prevList: Message[]) => [...prevList, message]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("joined_empty_room");
    };
  }, []);

  return (
    <>
      <div>
        {userRoomList.rooms?.map((room) => (
          <div className="ChatList" key={room.name}>
            <ChatBox
              key={room.name}
              messageList={messageList}
              sendMessage={sendMessage}
              roomName={room.name}
              socketId={userRoomList.socketId}
              handleBackgroundColor={handleBackgroundColor}></ChatBox>
          </div>
        ))}
      </div>
    </>
  );
}