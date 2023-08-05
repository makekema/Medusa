import { useContext, useEffect, useState, useRef } from 'react';
import { MessageContext } from '../context/MessageContext';
import { ChatContext } from '../context/ChatContext';
import {
  calculateLeft,
  calculateTop,
  getRandomColor,
} from '../utils';
import ChatInput from './ChatInput';
import ChatBoxHeader from './ChatBoxHeader';

export function ChatBox ({ room, socket, handleBackgroundColor }) {
  const { messageList, sendMessage } = useContext(MessageContext);
  const { leaveRoom } = useContext(ChatContext);
  const [colorMap, setColorMap] = useState({});
  const [color, setColor] = useState(
    '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  ); // Define the color variable
  const [position, setPosition] = useState({ top: '-1000px', left: '-1000px' });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // MESSAGE FUNCTIONALITY

  const handleSendMessage = (message) => {
    sendMessage(room, message);
  };

  const handleLeaveRoom = () => {
    handleBackgroundColor();
    leaveRoom(room);
  };

  // COLORS

  useEffect(() => {
    setColorMap((prevColorMap) => {
      return {
        ...prevColorMap,
        [socket.id]: color,
      };
    });
  }, [socket.id, color]);

  function getColor (sender) {
    if (!colorMap[sender]) {
      // Generate a random color for new users
      setColorMap((prevColorMap) => {
        return {
          ...prevColorMap,
          [sender]: getRandomColor(),
        };
      });
    }
    return colorMap[sender];
  }

  useEffect(() => {
    setPosition({ top: calculateTop(), left: calculateLeft() });
  }, []);

  // MOUSE DRAG AND DROP

  function handleMouseDown (event) {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - parseInt(position.left),
      y: event.clientY - parseInt(position.top),
    });
  }

  function handleMouseMove (event) {
    if (isDragging) {
      setPosition({
        left: event.clientX - dragOffset.x + 'px',
        top: event.clientY - dragOffset.y + 'px',
      });
    }
  }

  function handleMouseUp () {
    setIsDragging(false);
  }

  const messagesEndRef = useRef(null);
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
        data-testid='message-container'
        style={{ position: 'absolute', ...position }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        <ChatBoxHeader name={room} leaveRoom={handleLeaveRoom} />

        <div className='ChatWindow'>
          <div className='MessageWrapper'>
            {messageList
              .filter((messageContent) => messageContent.room === room)
              .map((messageContent) => (
                <div className={`Message ${messageContent.sender}`}>
                  <div
                    className='User_Time'
                    style={{ color: getColor(messageContent.socketId) }}>
                    {messageContent.sender === 'me'
                      ? 'You'
                      : `User ${messageContent.socketId.substring(0, 5)}`}
                    , {messageContent.time}
                  </div>

                  <div className='MessageContent'>{messageContent.message}</div>
                  <div ref={messagesEndRef}></div>
                </div>
              ))}
          </div>

          <ChatInput sendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
}
