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

export default function RoomSelector({
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
        <div className='RoomSelector'>
          <div>
            Hello, again!<br></br>Is there anything specific, you feel like
            talking about today?
          </div>
          <div className='SelectorInputAndButton'>
            <form onSubmit={handleJoinRoom}>
              <input
                data-testid='room-input'
                name='roomInput'
                className='SelectorInput'
                type='text'
                autoFocus
                placeholder='e.g. Japanese Food, Barbie, ...'
                onChange={(event) => {
                  setChatroomName(event.target.value);
                }}></input>
              <button
                type='submit'
                className='JoinButton'
                data-testid='join-button'>
                Join
              </button>
            </form>
          </div>
          <div>Otherwise, feel free to inspire yourself among friends.</div>
        </div>
      )}
      {isSelectorClosed && (
        <div className='PlusButton' data-testid='plus-button'>
          <button onClick={handleToggleSelector}>+</button>
        </div>
      )}
    </>
  );
}
