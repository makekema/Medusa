import React, { useContext } from 'react';
import { MessageContext } from '../context/MessageContext';

export default function ChatInput({ sendMessage }) {
  const { setMessage } = useContext(MessageContext);

  function handleSubmit (event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className='ChatInputWrapper'>
      <div className='ChatInput'>
        <form onSubmit={handleSubmit}>
          <input
            name='messageInput'
            className='MessageInput'
            type='text'
            onChange={(event) => {
              setMessage(event.target.value);
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
