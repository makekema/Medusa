import { ChatContext } from '../../context/ChatContext';
import { useContext, useState } from 'react';
import ChatBox from './ChatBox';
import { ChatContextType, Chatroom } from '../../context/ContextTypes';
import { createNewMessage, DEFAULT_MESSAGE } from '../helper';
import { socket } from '../../socket';
import { Message } from '../types';
import { Event, useSocket } from '../../hooks/useSocket';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      handler: () => {
        toast.success(DEFAULT_MESSAGE, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      },
    },
    {
      name: 'notify_user_left',
      handler: (roomName: string, username: string) => {
        /*
        **** NO ROOMLIST ****
        console.log(userRoomList)
        const userInRoom = userRoomList.rooms.find((currentRoom: Chatroom) => currentRoom.name === roomName);
        console.log(userInRoom);
         */

        const messsage = `User ${username} left the chatroom ${roomName}`;
        toast.info(messsage, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
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
        <ToastContainer />
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
