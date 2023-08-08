import React from 'react';

type IChatBoxHeaderProps = {
  roomName: string;
  leaveRoom: (roomName: string) => void;
  handleMouseDown: (e: any) => void;
  handleMouseMove: (e: any) => void;
  handleMouseUp: (e: any) => void;
};

export default function ChatBoxHeader({
  roomName,
  leaveRoom,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}: IChatBoxHeaderProps) {
  return (
    <div
      className='ChatBar'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      <div className='Room' data-testid='title'>
        {roomName}
      </div>
      <button className='LeaveButton' onClick={() => leaveRoom(roomName)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          className='bi bi-x-lg'
          viewBox='0 0 16 16'>
          <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
        </svg>
      </button>
    </div>
  );
}
