import { jest } from '@jest/globals';

type EventCallback = (callback: (response: string) => void) => void;
type BasicCallback = () => void;

const mockClient = {
  listeners: {} as Record<string, EventCallback>,
  on: function(event: string, callback: EventCallback | BasicCallback) {
    if (event === 'connect' && typeof callback === 'function') {
      callback();
    }
    this.listeners[event] = callback as EventCallback;
  },
  emit: function(event: string, callback: (response: string) => void) {
    if (this.listeners[event]) {
      this.listeners[event](callback);
    }
  },
  disconnect: jest.fn() as jest.Mock<void>, // If you want to simulate the client disconnecting.
  close: jest.fn() as jest.Mock<void>,
};

export { EventCallback, BasicCallback, mockClient };
