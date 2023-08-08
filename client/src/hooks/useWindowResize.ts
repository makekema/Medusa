import React, { useRef, useState } from 'react';

export default function useWindowResize() {
  const [size, setSize] = useState({ x: 300, y: 250 });
  const startSize = useRef(size);
  const startPosition = useRef({ x: 0, y: 0 });

  function handleSizeMouseDown(mouseDownEvent: React.MouseEvent) {
    startPosition.current = {
      x: mouseDownEvent.pageX,
      y: mouseDownEvent.pageY,
    };
    document.addEventListener(
      'mousemove',
      handleSizeMouseMove as unknown as EventListener
    );
    document.body.addEventListener('mouseup', handleSizeMouseUp, {
      once: true,
    });
  }

  function handleSizeMouseMove(mouseMoveEvent: React.MouseEvent) {
    setSize((current) => ({
      x: startSize.current.x - startPosition.current.x + mouseMoveEvent.pageX,
      y: startSize.current.y - startPosition.current.y + mouseMoveEvent.pageY,
    }));
  }

  function handleSizeMouseUp() {
    document.removeEventListener(
      'mousemove',
      handleSizeMouseMove as unknown as EventListener
    );
  }

  return {
    size,
    handleSizeMouseDown,
  };
}
