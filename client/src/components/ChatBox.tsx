import { useContext, useEffect, useState, useRef } from 'react';
import { MessageContext } from '../context/MessageContext';
import { ChatContext } from '../context/ChatContext';
import {
  calculateLeft,
  calculateTop,
  getRandomColor,
} from '../utils';
import ChatBoxInput from './ChatBoxInput';
import ChatBoxHeader from './ChatBoxHeader';
import { ChatContextType, MessageContextType } from '../context/ContextTypes';

type IChatBoxProps = {
  roomName: string,
  socketId: string,
  handleBackgroundColor: () => void;
};

export function ChatBox ({ roomName, socketId, handleBackgroundColor }: IChatBoxProps) {
  const { messageList, sendMessage } = useContext(MessageContext) as MessageContextType;
  const { leaveRoom } = useContext(ChatContext) as ChatContextType;
  //Color states
  // const [colorMap, setColorMap] = useState({});
  // const [color, setColor] = useState(
  //   '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  // );
  // Define the color variable

  // Position states
  const [position, setPosition] = useState({ top: '-1000px', left: '-1000px' });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // MESSAGE FUNCTIONALITY
  const handleSendMessage = (message: string) => {
    sendMessage(roomName, message);
  };

  const handleLeaveRoom = () => {
    handleBackgroundColor();
    leaveRoom(roomName);
  };

  // Colors of the usernames
  // useEffect(() => {
  //   setColorMap((prevColorMap) => {
  //     return {
  //       ...prevColorMap,
  //       [socketId]: color,
  //     };
  //   });
  // }, [socketId, color]);

  // function getColor (socketId: string) {
  //   if (!colorMap[socketId]) {
  //     // Generate a random color for new users
  //     setColorMap((prevColorMap) => {
  //       return {
  //         ...prevColorMap,
  //         [socketId]: getRandomColor(),
  //       };
  //     });
  //   }
  //   return colorMap[socketId];
  // }


  // Generate random position
  useEffect(() => {
    setPosition({ top: calculateTop(), left: calculateLeft() });
  }, []);

  // Move chatbox with mouse
  function handleMouseDown (e: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - parseInt(position.left),
      y: e.clientY - parseInt(position.top),
    });
  }

  function handleMouseMove (e: React.MouseEvent<HTMLDivElement>) {
    if (isDragging) {
      setPosition({
        left: e.clientX - dragOffset.x + 'px',
        top: e.clientY - dragOffset.y + 'px',
      });
    }
  }

  function handleMouseUp () {
    setIsDragging(false);
  }

  // Auto scroll when there is a new message
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);


  return (
    <>
      <div
        className='MessageContainer'
        style={{ position: 'absolute', ...position }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        <ChatBoxHeader roomName={roomName} leaveRoom={handleLeaveRoom} />

        <div className='ChatWindow'>
          <div className='MessageWrapper'>
            {messageList
              .filter((messageContent) => messageContent.roomName === roomName)
              .map((messageContent, i) => (
                <div className={`Message ${messageContent.user}`} key={i}>
                  <div
                    className='User_Time'
                  // style={{ color: getColor(messageContent.user) }}
                  >
                    {messageContent.user === socketId
                      ? 'You'
                      : `User ${messageContent.user.substring(0, 5)}`}
                    , {messageContent.time}
                  </div>

                  <div className='MessageContent'>{messageContent.message}</div>
                  <div ref={messagesEndRef}></div>
                </div>
              ))}
          </div>

          <ChatBoxInput sendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
}
