import React, {useContext} from 'react';
import { MessageContext } from '../context/MessageContext';

export default function ChatInput({ sendMessage }) {
  const { setMessage } = useContext(MessageContext);
  return (
    <div className='ChatInputWrapper'>
      <div className='ChatInput'>
        <input
          className='MessageInput'
          type='text'
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button class='SendButton' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}