import * as React from 'react';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import ChatRoomMarquee from './ChatRoomMarquee';
import NewChatRoomForm from './NewChatRoomForm';

export interface IChatroomManagerProps {
  handleBackgroundColor: () => void;
}

export default function ChatroomManager({
  handleBackgroundColor,
}: IChatroomManagerProps) {
  const [isSelectorVisible, setSelectorVisible] = useState(true);
  const [isSelectorClosed, setSelectorClosed] = useState(false);

  return (
    <div>
      <div className='room-list-container'>
        <div
          className='RoomListMarquee'
          style={{ background: 'rgb(182,182,182)', color: 'rgb(15,11,39)' }}>
          <Marquee pauseOnHover={true} speed={50}>
            <ChatRoomMarquee
              handleBackgroundColor={handleBackgroundColor}
              setSelectorClosed={setSelectorClosed}
              setSelectorVisible={setSelectorVisible}></ChatRoomMarquee>
          </Marquee>
          <Marquee pauseOnHover={true} speed={25}>
            <ChatRoomMarquee
              handleBackgroundColor={handleBackgroundColor}
              setSelectorClosed={setSelectorClosed}
              setSelectorVisible={setSelectorVisible}></ChatRoomMarquee>
          </Marquee>
        </div>
      </div>
      <NewChatRoomForm
        handleBackgroundColor={handleBackgroundColor}
        setSelectorClosed={setSelectorClosed}
        setSelectorVisible={setSelectorVisible}
        isSelectorClosed={isSelectorClosed}
        isSelectorVisible={isSelectorVisible}></NewChatRoomForm>
    </div>
  );
}
