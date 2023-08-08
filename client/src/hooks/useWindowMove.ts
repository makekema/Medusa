import { useEffect, useState } from "react";
import { calculateLeft, calculateTop } from "../utils";

export default function useWindowMove () {
  const [position, setPosition] = useState({ top: '-1000px', left: '-1000px' });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Generate random position
  useEffect(() => {
    setPosition({ top: calculateTop(), left: calculateLeft() });
  }, []);

  // Move chatbox with mouse
  function handleMouseDown (e: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - parseInt(position.left),
      y: e.clientY - parseInt(position.top),
    });
  }

  function handleMouseMove (e: React.MouseEvent<HTMLDivElement>) {
    if (isDragging) {
      setPosition({
        left: e.clientX - dragOffset.x + 'px',
        top: e.clientY - dragOffset.y + 'px',
      });
    }
  }

  function handleMouseUp () {
    setIsDragging(false);
  }

  return {
    position,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
}