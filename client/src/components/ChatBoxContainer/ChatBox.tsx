import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../context/ChatContext';
import ChatBoxInput from './ChatBoxInput';
import ChatBoxHeader from './ChatBoxHeader';
import { ChatContextType } from '../../context/ContextTypes';
import useWindowMove from '../../hooks/useWindowMove';
import { Message } from '../types';

type IChatBoxProps = {
  messageList: Message[],
  sendMessage: (roomName: string, message: string) => void;
  roomName: string,
  socketId: string,
  handleBackgroundColor: () => void;
};

export default function ChatBox ({ messageList, sendMessage, roomName, socketId, handleBackgroundColor }: IChatBoxProps) {
  const { leaveRoom } = useContext(ChatContext) as ChatContextType;
  const { position, handleMouseDown, handleMouseMove, handleMouseUp } = useWindowMove();

  // MESSAGE FUNCTIONALITY
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
      <div
        className='MessageContainer'
        style={{ position: 'absolute', ...position }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        data-testid='message-container'>
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

                  <div
                    className='MessageContent'
                    data-testid={`message-content-${i}`}>
                    {messageContent.message}
                  </div>
                  <div ref={messagesEndRef}></div>
                </div>
              ))}
          </div>

          <ChatBoxInput sendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );

  // LOGIC to assign different colors to usernames

  //Color states
  // const [colorMap, setColorMap] = useState({});
  // const [color, setColor] = useState(
  //   '#' + ((Math.random() * 0xffffff) << 0).toString(16)
  // );
  // Define the color variable

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

  // Auto scroll when there is a new message
}
