import { Dispatch, SetStateAction, useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { ChatContextType } from '../../context/ContextTypes';

type IRoomListProps = {
  handleBackgroundColor: () => void;
  setSelectorClosed: Dispatch<SetStateAction<boolean>>;
  setSelectorVisible: Dispatch<SetStateAction<boolean>>;
};

export default function ChatRoomMarquee({
  handleBackgroundColor,
  setSelectorClosed,
  setSelectorVisible,
}: IRoomListProps) {
  const { chatrooms, joinRoom } = useContext(ChatContext) as ChatContextType;

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
      <div className='flex-col overflow-hidden'>
        <div>
          {chatrooms.map((chatroom) => {
            return (
              <button
                className='cursor-pointer text-5xl font-bold mx-10 my-1 uppercase'
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
