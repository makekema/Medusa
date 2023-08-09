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
      <div className='w-screen'>
        <div
          className='bg-neutral-400 text-gray-900'>
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
