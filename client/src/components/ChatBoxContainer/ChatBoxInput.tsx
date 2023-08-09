import React, { useState } from 'react';

type IChatBoxInput = {
  sendMessage: (message: string) => void;
  bgColor: string;
};

export default function ChatInput({ sendMessage, bgColor }: IChatBoxInput) {
  const [message, setMessage] = useState<string>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  return (
    <div
      className='absolute bottom-2 right-2 left-2 flex justify-stretch gap-1 break-words'
      style={{ backgroundColor: bgColor }}>
      <form onSubmit={handleSubmit} className='flex w-full'>
        <input
          name='messageInput'
          className='bg-white/[0.05] rounded-sm p-2 w-full'
          value={message}
          type='text'
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          data-testid='message-input'
        />
        <button
          type='submit'
          className='bg-white-6 rounded-sm p-3 cursor-pointer '
          data-testid='send-button'>
          Send
        </button>
      </form>
    </div>
  );
}
