import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { ChatContextType } from '../context/ContextTypes';

type IRoomListProps = {
  handleBackgroundColor: () => void;
};

export default function RoomList ({ handleBackgroundColor }: IRoomListProps) {
  const { chatrooms, setSelectorClosed, setSelectorVisible, joinRoom } = useContext(ChatContext) as ChatContextType;

  const handleButtonClick = (roomName: string) => {
    joinRoom(roomName);
    toggleSelector();
    handleBackgroundColor();
  };

  const toggleSelector = () => {
    setSelectorVisible(false);
    setSelectorClosed(true);
  };

  return (
    <>
      <div className='RoomList'>
        <div>
          {chatrooms.map((chatroom) => {
            return (
              <button
                className='RoomButton'
                key={chatroom.name}
                onClick={() => handleButtonClick(chatroom.name)}>
                {chatroom.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}