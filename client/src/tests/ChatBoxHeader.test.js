/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import userEvent from '@testing-library/user-event';
import ChatBoxHeader from '../components/ChatBoxHeader';
import { render, screen, act } from '@testing-library/react';

const mockName = 'Poodles';
const mockLeaveRoom = jest.fn();

describe('Chat box header', () => {
  it('should show the name of the room', () => {
    render(<ChatBoxHeader name={mockName} leaveRoom={mockLeaveRoom} />);

    const title = screen.getByTestId('title');

    expect(title).toBe(mockName);
  });

  it('should call the leave room function', () => {
    render(<ChatBoxHeader name={mockName} leaveRoom={mockLeaveRoom} />);

    const button = screen.getByTestId('leave-button');

    userEvent.click(button)

    expect(mockLeaveRoom).toBeCalled();
  })
});