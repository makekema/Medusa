/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatList from '../components/ChatList';
import { ChatContext } from '../context/ChatContext';

const mockHandleBackgroundColor = jest.fn();
const mockChatContext = {
  userRoomList: {
    rooms: [
      { name: 'Fiddle Faddle' },
      { name: 'Testing' },
      { name: 'Pf4ffing' },
    ],
  },
  socket: 'socket_',
};

describe('Chat input', () => {
  it.skip('should render a list of chat boxes', () => {
    render(
      <ChatContext.Provider value={mockChatContext}>
        <ChatList handleBackgroundColor={mockHandleBackgroundColor} />
      </ChatContext.Provider>
    );
    const chatBoxElements = screen.getAllByTestId('chat-list');

    expect(chatBoxElements.length).toBe(
      mockChatContext.userRoomList.rooms.length
    );
  });
});
