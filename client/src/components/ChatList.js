import Chat from "./Messaging";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

function ChatList ({ handleBackgroundColor }) {

  const { userRoomList, socket } = useContext(ChatContext);

  return (
    <>
      <div>
        {userRoomList.rooms?.map((room) => (
          <div className="ChatList" key={room.name}>
            <Chat room={room.name} socket={socket} handleBackgroundColor={handleBackgroundColor}></Chat>
          </div>
        ))}
      </div>
    </>
  );

}

export default ChatList;


