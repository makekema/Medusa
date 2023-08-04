import { useContext, useEffect, useState, useRef } from 'react';
import { MessageContext } from '../context/MessageContext';
import { ChatContext } from '../context/ChatContext';
import {
  calculateLeft,
  calculateTop,
  getRandomColor,
} from '../helperFunctions';
import { CloseButton } from './CloseButton';
import ChatInput from './ChatInput';

export default function ChatBox({ room, socket }) {
  const { setMessage, messageList, sendMessage } = useContext(MessageContext); //, message
  const { leaveRoom, handleBackgroundColor } = useContext(ChatContext);
  const [colorMap, setColorMap] = useState({});
  const [color, setColor] = useState(
    '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  );
  const [position, setPosition] = useState({ top: '-1000px', left: '-1000px' });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // MESSAGE FUNCTIONALITY

  const handleSendMessage = (e) => {
    sendMessage(room);
    const parentNode = e.target.parentNode;
    const input = parentNode.querySelector('input');
    input.value = '';
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
  }, [socket.id, color]); //colour

  function getColor(sender) {
    if (!colorMap[sender]) {
      // Generate a random color for new users
      setColorMap((prevState) => {
        return {
          ...prevState,
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

  function handleMouseDown(event) {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - parseInt(position.left),
      y: event.clientY - parseInt(position.top),
    });
  }

  function handleMouseMove(event) {
    if (isDragging) {
      setPosition({
        left: event.clientX - dragOffset.x + 'px',
        top: event.clientY - dragOffset.y + 'px',
      });
    }
  }

  function handleMouseUp() {
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
        style={{ position: 'absolute', ...position }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        <div className='ChatBar'>
          <div className='Room'>{room}</div>
          <button class='LeaveButton' onClick={handleLeaveRoom}>
            <CloseButton />
          </button>
        </div>

        <div className='ChatWindow'>
          <div className='MessageWrapper'>
            {messageList
              .filter((messageContent) => messageContent.room === room)
              .map((messageContent) => (
                <div className={`Message ${messageContent.sender}`}>
                  <div
                    className='User_Time'
                    style={{
                      color: getColor(messageContent.socketId),
                    }}>
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
