import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { ChatContextType } from '../context/ContextTypes';

type IRoomSelectorProps = {
  handleBackgroundColor: () => void;
};

export default function RoomSelector ({ handleBackgroundColor }: IRoomSelectorProps) {
  const [roomName, setRoomName] = useState('');
  const {
    joinRoom,
    setSelectorVisible,
    setSelectorClosed,
    isSelectorClosed,
    isSelectorVisible } = useContext(ChatContext) as ChatContextType;

  const handleJoinRoom = (event: React.FormEvent) => {
    event.preventDefault();
    setSelectorVisible(false);
    setSelectorClosed(true);
    handleBackgroundColor();
    joinRoom(roomName);
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
                name='roomInput'
                className='SelectorInput'
                type='text'
                autoFocus
                placeholder='e.g. Japanese Food, Barbie, ...'
                onChange={(event) => {
                  setRoomName(event.target.value);
                }}></input>
              <button type='submit' className='JoinButton'>
                Join
              </button>
            </form>
          </div>
          <div>Otherwise, feel free to inspire yourself among friends.</div>
        </div>
      )}
      {isSelectorClosed && (
        <div className='PlusButton'>
          <button onClick={handleToggleSelector}>+</button>
        </div>
      )}
    </>
  );
}
