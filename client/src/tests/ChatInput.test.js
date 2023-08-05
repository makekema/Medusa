import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInput from '../components/ChatInput';

/*
TEST SUBMIT EVENT
1. Mock the sendMessage function
2. Simulate form submission => verify sendMessage fn is call with correct message
3. Verify message state is cleared after submission

TEST STATE CHANGES
1. Simulate changes in input field

EDGE CASES
1.  Testing the behavior with different input values.

*/

describe('Chat input', () => {
  it('should call sendMessage function with the correct message', () => {
    const mockSendMessage = jest.fn();
    render(<ChatInput sendMessage={mockSendMessage} />);
    const inputElement = screen.getByTestId('message-input');

    const buttonElement = screen.getByTestId('send-button');

    const testMessage = 'Fiddle Faddle';

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(inputElement, testMessage);
      userEvent.click(buttonElement);
    });

    expect(mockSendMessage).toHaveBeenCalledWith(testMessage);
    expect(inputElement.value).toBe('');
  });

  it('should update state as input changes', () => {
    const testInput = 'Pfaffaroo';
    render(<ChatInput sendMessage={() => {}} />);

    const inputElement = screen.getByTestId('message-input');
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(inputElement, testInput);
    });

    expect(inputElement.value).toBe(testInput);
  });
});
