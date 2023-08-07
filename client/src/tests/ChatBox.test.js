/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
// import userEvent from '@testing-library/user-event';
import ChatBox from '../components/ChatBox';
import { render, screen, act } from '@testing-library/react';
import { ChatContext } from '../context/ChatContext';
import { MessageContext } from '../context/MessageContext';

const mockChatContext = {
  leaveRoom: jest.fn(),
};

const mockMessageContext = {
  joinRoom: jest.fn(),
  setSelectorVisible: jest.fn(),
  setSelectorClosed: jest.fn(),
  isSelectorClosed: true,
  isSelectorVisible: true,
};

const mockHandleBackgroundColor = jest.fn();
const mockRoom = 'Testing';
const mockSocket = 'socket_';

describe('Room Selector', () => {
  it('should show the plus button if selectedClosed is true', () => {
    render(
      <ChatContext.Provider value={mockChatContext}>
        <MessageContext.Provider value={mockMessageContext}>
          <ChatBox
            room={mockRoom}
            socket={mockSocket}
            handleBackgroundColor={mockHandleBackgroundColor}
          />
        </MessageContext.Provider>
      </ChatContext.Provider>
    );

    const messageContainer = screen.getByTestId('message-container');

    expect(messageContainer).toBeTruthy();
  });
});
