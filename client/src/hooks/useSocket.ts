import { useEffect } from 'react';
import { socket } from '../socket';

export interface Event {
  name: string;
  handler (...args: any[]): any;
}

export function useSocket (events: Event[]) {
  useEffect(() => {
    for (const event of events) {
      socket.on(event.name, event.handler);
    }

    return function () {
      for (const event of events) {
        socket.off(event.name);
      }
    };
  }, []);
}