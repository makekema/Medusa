import React, { useState } from 'react';

export default function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  return (
    <div className='ChatInputWrapper'>
      <div className='ChatInput'>
        <form onSubmit={handleSubmit}>
          <input
            data-testid='message-input'
            name='messageInput'
            className='MessageInput'
            value={message}
            type='text'
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button data-testid='send-button' type='submit' className='SendButton'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
