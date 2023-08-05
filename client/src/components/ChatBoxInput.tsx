import React, { useState } from 'react';

type IChatBoxInput = {
  sendMessage: (message: string) => void;
};

export default function ChatInput ({ sendMessage }: IChatBoxInput) {
  const [message, setMessage] = useState<string>('');

  function handleSubmit (e: React.FormEvent) {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  return (
    <div className='ChatInputWrapper'>
      <div className='ChatInput'>
        <form onSubmit={handleSubmit}>
          <input
            name='messageInput'
            className='MessageInput'
            value={message}
            type='text'
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type='submit' className='SendButton'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}