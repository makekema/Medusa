import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { ChatContextType } from '../../context/ContextTypes';
import { ChatContext } from '../../context/ChatContext';

type IRoomSelectorProps = {
  handleBackgroundColor: () => void;
  setSelectorClosed: Dispatch<SetStateAction<boolean>>;
  setSelectorVisible: Dispatch<SetStateAction<boolean>>;
  isSelectorClosed: boolean;
  isSelectorVisible: boolean;
};

export default function NewChatRoomForm({
  handleBackgroundColor,
  setSelectorClosed,
  setSelectorVisible,
  isSelectorClosed,
  isSelectorVisible,
}: IRoomSelectorProps) {
  const [chatroomName, setChatroomName] = useState('');
  const { joinRoom } = useContext(ChatContext) as ChatContextType;

  const handleJoinRoom = (event: React.FormEvent) => {
    event.preventDefault();
    setSelectorVisible(false);
    setSelectorClosed(true);
    handleBackgroundColor();
    joinRoom(chatroomName);
  };

  const handleToggleSelector = () => {
    setSelectorVisible(!isSelectorVisible);
    setSelectorClosed(false);
  };

  return (
    <>
      {isSelectorVisible && !isSelectorClosed && (
        // <div className='RoomSelector'>
        <div className='absolute bottom-0 left-0 flex-col gap-4 w-30 p-5 font-semibold'>
          <div>
            Hello, again!<br></br>Is there anything specific, you feel like
            talking about today?
          </div>
          
            <form onSubmit={handleJoinRoom} className='flex gap-1 w-full'>
              <input
                className='p-3 bg-white/[.15] border-none w-full outline-none placeholder:font-light placeholder:italic placeholder:text-sm placeholder-slate-700'
                data-testid='room-input'
                name='roomInput'
                type='text'
                autoFocus
                placeholder='e.g. Japanese Food, Barbie, ...'
                onChange={(event) => {
                  setChatroomName(event.target.value);
                }} />
              <button
                type='submit'
                className='bg-white/[.1] rounded-sm p-3 border-none cursor-pointer font-bold text-sm'
                data-testid='join-button'>
                Join
              </button>
            </form>
          
          <div>Otherwise, feel free to inspire yourself among friends.</div>
        </div>
      )}
      {isSelectorClosed && (
        <div className='bg-white/[.15] absolute bottom-5 left-5 font-bold text-sm py-2 px-4 cursor-pointer rounded-full text-center' data-testid='plus-button'>
          <button onClick={handleToggleSelector}>+</button>
        </div>
      )}
    </>
  );
}
