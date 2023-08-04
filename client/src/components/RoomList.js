import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { MessageContext } from "../context/MessageContext";


function RoomList ({ handleBackgroundColor }) {
  const { chatrooms, setSelectorClosed, setSelectorVisible, joinRoom } = useContext(ChatContext);
  // const { handleRoomButtonClick } = useContext(MessageContext);




  const handleButtonClick = (roomName) => {
    // handleRoomButtonClick(roomName);
    joinRoom(roomName);
    toggleSelector(roomName);
    handleBackgroundColor();
    console.log('I was executed handleBf');

  };

  const toggleSelector = () => {
    setSelectorVisible(false);
    setSelectorClosed(true);
  };

  return (
    <>
      <div className="RoomList" >
        <div>
          {chatrooms.map((chatroom) => {
            return (
              <button className="RoomButton"
                key={chatroom._id}
                onClick={() => handleButtonClick(chatroom.name)}
              >
                {chatroom.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RoomList;


