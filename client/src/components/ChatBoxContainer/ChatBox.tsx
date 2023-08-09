import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../context/ChatContext';
import ChatBoxInput from './ChatBoxInput';
import ChatBoxHeader from './ChatBoxHeader';
import { ChatContextType } from '../../context/ContextTypes';
import useWindowMove from '../../hooks/useWindowMove';
import { Message } from '../types';
import useRandomUserNameColor from '../../hooks/useRandomUserNameColor';
import ResizableComponent from './ResizableComponent';

type IChatBoxProps = {
  messageList: Message[];
  sendMessage: (roomName: string, message: string) => void;
  roomName: string;
  socketId: string;
  handleBackgroundColor: () => void;
  bgColor: string
};

export default function ChatBox({
  bgColor,
  messageList,
  sendMessage,
  roomName,
  socketId,
  handleBackgroundColor,
}: IChatBoxProps) {
  const { leaveRoom } = useContext(ChatContext) as ChatContextType;
  const { position, handleMouseDown, handleMouseMove, handleMouseUp } =
    useWindowMove();
  const { getColor } = useRandomUserNameColor(socketId);

  const handleSendMessage = (message: string) => {
    sendMessage(roomName, message);
  };

  const handleLeaveRoom = () => {
    handleBackgroundColor();
    leaveRoom(roomName);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <>
      <ResizableComponent
        position={position}
        data-testid='message-container'>
        <ChatBoxHeader
          roomName={roomName}
          leaveRoom={handleLeaveRoom}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
        />

        <div className='ChatWindow'>
          <div className='MessageWrapper'>
            {messageList
              .filter((messageContent) => messageContent.roomName === roomName)
              .map((messageContent, i) => (
                <div
                  className={`Message ${
                    messageContent.user === socketId ? 'me' : 'other'
                  }`}
                  key={i}>
                  <div
                    className='User_Time'
                    style={{ color: getColor(messageContent.user) }}>
                    {messageContent.user === socketId
                      ? 'You'
                      : `User ${messageContent.user.substring(0, 5)}`}
                    , {messageContent.time}
                  </div>

                  <div
                    className='MessageContent'
                    data-testid={`message-content-${i}`}>
                    {messageContent.message}
                  </div>
                  <div ref={messagesEndRef}></div>
                </div>
              ))}
          </div>

          <ChatBoxInput bgColor={bgColor} sendMessage={handleSendMessage} />
        </div>
      </ResizableComponent>
    </>
  );
}
