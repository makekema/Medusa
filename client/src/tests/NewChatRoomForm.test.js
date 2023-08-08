/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import userEvent from '@testing-library/user-event';
import RoomSelector from '../components/ChatRoomManager/NewChatRoomForm';
import { render, screen, act } from '@testing-library/react';
import { ChatContext } from '../context/ChatContext';

const mockChatContext = {
  joinRoom: jest.fn(),
};
const mockSetSelectorVisible = jest.fn();
const mockSetSelectorClosed = jest.fn();
const mockIsSelectorClosedFalse = false;
const mockIsSelectorClosedTrue = true;
const mockIsSelectorVisible = true;
const mockHandleBackgroundColor = jest.fn();

describe('Room Selector', () => {
  it('should show the plus button if selectedClosed is true', () => {
    render(
      <ChatContext.Provider
        value={mockChatContext}
        setSelectorClosed={mockSetSelectorClosed}
        setSelectorVisible={mockSetSelectorVisible}
        isSelectorClosed={mockIsSelectorClosedTrue}
        isSelectorVisible={mockIsSelectorVisible}>
        <RoomSelector handleBackgroundColor={mockHandleBackgroundColor} />
      </ChatContext.Provider>
    );

    const plusButton = screen.getByTestId('plus-button');

    expect(plusButton).toBeTruthy();
  });

  it('input should update the room state', () => {
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

  it('should call joinRoom function with the correct room name', () => {
    render(
      <ChatContext.Provider
        value={mockChatContext}
        setSelectorClosed={mockSetSelectorClosed}
        setSelectorVisible={mockSetSelectorVisible}
        isSelectorClosed={mockIsSelectorClosedFalse}
        isSelectorVisible={mockIsSelectorVisible}>
        <RoomSelector handleBackgroundColor={mockHandleBackgroundColor} />
      </ChatContext.Provider>
    );

    const testRoomName = 'Meat Pies!';
    const input = screen.getByTestId('room-input');
    const join = screen.getByTestId('join-button');

    act(() => {
      userEvent.type(input, testRoomName);
      userEvent.click(join);
    });

    expect(mockChatContext.joinRoom).toHaveBeenCalledWith(
      testRoomName
    );
  });
});
