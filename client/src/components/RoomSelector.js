import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';

function RoomSelector({ handleBackgroundColor }) {
  const [roomName, setRoomName] = useState('');
  const {
    joinRoom,
    setSelectorVisible,
    setSelectorClosed,
    isSelectorClosed,
    isSelectorVisible,
  } = useContext(ChatContext);

  const handleJoinRoom = (event) => {
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
        <div className='RoomSelector' data-testid='room-selector'>
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
                  setRoomName(event.target.value);
                }}></input>
              <button data-testid='join-button' type='submit' className='JoinButton'>
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

export default RoomSelector;
