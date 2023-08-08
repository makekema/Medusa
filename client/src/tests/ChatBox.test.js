/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import ChatBox from '../components/ChatBoxContainer/ChatBox';
import { render, screen, waitFor } from '@testing-library/react';
import { ChatContext } from '../context/ChatContext';

const mockChatContext = {
  leaveRoom: jest.fn(),
};

const mockHandleBackgroundColor = jest.fn();
const mockSendMessage = jest.fn();
const mockRoomName = 'Testing';
const mockSocketId = 'socket_';
const mockMessageList = [
  {
    user: 'bob',
    roomName: 'Fiddle Faddle',
    message: 'hey hey hey',
    time: '15:40',
  },
  {
    user: 'alice',
    roomName: 'Fiddle Faddle',
    message: 'did you get that thing I sent you?',
    time: '15:56',
  },
];

describe.skip('Chat Box', () => {
  it('should display messages in the chat window', async () => {
    render(
      <ChatContext.Provider value={mockChatContext}>
        <ChatBox
          messageList={mockMessageList}
          room={mockRoomName}
          socket={mockSocketId}
          sendMessage={mockSendMessage}
          handleBackgroundColor={mockHandleBackgroundColor}
        />
      </ChatContext.Provider>
    );

    await waitFor(() => {
      const messageContent1 = screen.getByTestId('message-content-0');
      const messageContent2 = screen.getByTestId('message-content-1');

      expect(messageContent1).toBeInTheDocument();
      expect(messageContent1).toHaveTextContent(mockMessageList[0].message);

      expect(messageContent2).toBeInTheDocument();
      expect(messageContent2).toHaveTextContent(mockMessageList[1].message);
    });
  });

  it('should display the user and the time of message', () => {
    render(
      <ChatContext.Provider value={mockChatContext}>
        <ChatBox
          messageList={mockMessageList}
          room={mockRoomName}
          socket={mockSocketId}
          sendMessage={mockSendMessage}
          handleBackgroundColor={mockHandleBackgroundColor}
        />
      </ChatContext.Provider>
    );

    const user = screen.getByText(mockMessageList[0].user);
    const time = screen.getByText(mockMessageList[1].time);

    expect(user).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });
});
