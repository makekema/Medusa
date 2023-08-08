import { ChatContext } from '../../context/ChatContext';
import { useContext, useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import { ChatContextType } from '../../context/ContextTypes';
import { createNewMessage, DEFAULT_MESSAGE } from '../helper';
import { socket } from '../../socket';
import { Message } from '../types';
import { Event, useSocket } from '../../hooks/useSocket';

type IChatBoxListProps = {
  handleBackgroundColor: () => void;
};

export default function ChatBoxContainer({
  handleBackgroundColor,
}: IChatBoxListProps) {
  const { userRoomList } = useContext(ChatContext) as ChatContextType;
  const [messageList, setMessageList] = useState<Message[]>([]);
  const events: Event[] = [
    {
      name: 'receive_message',
      handler: (message: any) => {
        setMessageList((prevList: Message[]) => [...prevList, message]);
      },
    },
    {
      name: 'joined_empty_room',
      handler: (data) => {
        const message = createNewMessage(socket.id, DEFAULT_MESSAGE, data.room);
        setMessageList((prevList: Message[]) => [...prevList, message]);
      },
    },
  ];
  useSocket(events);

  const sendMessage = (roomName: string, message: string) => {
    if (roomName !== '' && message !== '') {
      const newMessage = createNewMessage(socket.id, message, roomName);
      socket.emit('send_message', newMessage);
      setMessageList((list) => [...list, newMessage]);
    }
  };

  return (
    <>
      <div>
        {userRoomList.rooms?.map((room) => (
          <div className='ChatList' key={room.name} data-testid='chat-list'>
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
