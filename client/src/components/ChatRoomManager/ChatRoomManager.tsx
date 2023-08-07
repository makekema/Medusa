import * as React from 'react';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import RoomList from './ChatRoomMarquee';
import RoomSelector from './NewChatRoomForm';

export interface IChatroomManagerProps {
  handleBackgroundColor: () => void;
}

export default function ChatroomManager ({ handleBackgroundColor }: IChatroomManagerProps) {
  const [isSelectorVisible, setSelectorVisible] = useState(true);
  const [isSelectorClosed, setSelectorClosed] = useState(false);

  return (
    <div>
      <div className='room-list-container'>
        <div
          className='RoomListMarquee'
          style={{ background: 'rgb(182,182,182)', color: 'rgb(15,11,39)' }}>
          <Marquee pauseOnHover={true} speed={50}>
            <RoomList
              handleBackgroundColor={handleBackgroundColor}
              setSelectorClosed={setSelectorClosed}
              setSelectorVisible={setSelectorVisible}
            ></RoomList>
          </Marquee>
          <Marquee pauseOnHover={true} speed={25}>
            <RoomList
              handleBackgroundColor={handleBackgroundColor}
              setSelectorClosed={setSelectorClosed}
              setSelectorVisible={setSelectorVisible}
            ></RoomList>
          </Marquee>
        </div>
      </div>
      <RoomSelector
        handleBackgroundColor={handleBackgroundColor}
        setSelectorClosed={setSelectorClosed}
        setSelectorVisible={setSelectorVisible}
        isSelectorClosed={isSelectorClosed}
        isSelectorVisible={isSelectorVisible}
      ></RoomSelector>
    </div>
  );
}
