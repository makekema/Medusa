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
    <div className='ChatInput' style={{ backgroundColor: bgColor }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <input
          name='messageInput'
          className='MessageInput'
          value={message}
          type='text'
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          data-testid='message-input'
        />
        <button type='submit' className='SendButton' data-testid='send-button'>
          Send
        </button>
      </form>
    </div>
  );
}
