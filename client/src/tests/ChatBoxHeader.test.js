/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import ChatBoxHeader from '../components/ChatBoxContainer/ChatBoxHeader';

const mockName = 'Poodles';
const mockLeaveRoom = jest.fn();

describe.skip('Chat box header', () => {
  it('should show the name of the room', () => {
    render(<ChatBoxHeader roomName={mockName} leaveRoom={mockLeaveRoom} />);

    const title = screen.getByTestId('title');

    expect(title.textContent).toBe(mockName);
  });

  it('should call the leave room function', () => {
    render(<ChatBoxHeader name={mockName} leaveRoom={mockLeaveRoom} />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    expect(mockLeaveRoom).toBeCalled();
  });
});
