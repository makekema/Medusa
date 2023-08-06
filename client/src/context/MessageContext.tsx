import { createContext, useEffect, useState } from 'react';
import { socket } from '../socket';
import { Message, MessageContextType } from './ContextTypes';
import { createNewMessage, DEFAULT_MESSAGE } from './helper';

const MessageContext = createContext<MessageContextType | null>(null);

type IMessagePRoviderProps = {
  children: React.ReactNode;
};

function MessageProvider ({ children }: IMessagePRoviderProps) {
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

  const value: MessageContextType = { messageList, sendMessage };
  return <MessageContext.Provider value={value} >{children}</MessageContext.Provider>;
}
export { MessageContext, MessageProvider };