import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

function RoomSelector({ handleBackgroundColor }) {
  const {
    setRoom,
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
    joinRoom();
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
                  setRoom(event.target.value);
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

export default RoomSelector;
