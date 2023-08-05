/* eslint-disable testing-library/no-unnecessary-act */
import React, { useContext, createContext } from 'react';
import userEvent from '@testing-library/user-event';
import RoomSelector from '../components/RoomSelector';
import { render, screen, act } from '@testing-library/react';
import { ChatContext } from '../context/ChatContext';

/*
1. Room state should change when input changes
2. verify handleToggleSelector sets the selectorVisible & selectorCosed
3. verify if selectorClosed then display plus button
*/

describe('Room Selector', () => {
  const mockChatContext = {
    joinRoom: jest.fn(),
    setSelectorVisible: jest.fn(),
    setSelectorClosed: jest.fn(),
    isSelectorClosed: false,
    isSelectorVisible: true,
  };

  it('input should update the room state', () => {
    const mockHandleBackgroundColor = jest.fn();
    render(
      <ChatContext.Provider value={mockChatContext}>
        <RoomSelector handleBackgroundColor={mockHandleBackgroundColor} />
      </ChatContext.Provider>
    );
    const testInput = 'Fiddle Faddle';
    const input = screen.getByTestId('room-input');
    act(() => {
      userEvent.type(input, testInput);
    });
    const roomNameState = input.value;
    expect(roomNameState).toBe(testInput);
  });
});
