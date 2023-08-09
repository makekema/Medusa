import React from 'react';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';

type IResizableComponentProps = {
  children: React.ReactNode;
  position: {
    top: string;
    left: string;
  };
};

export default function ResizableDraggableComponent({
  children,
  position,
}: IResizableComponentProps) {
  return (
    <Draggable handle='.ChatBar'>
      <Resizable
        className='MessageContainer'
        style={{ position: 'absolute', ...position }}
        defaultSize={{
          width: 250,
          height: 300,
        }}
        minWidth={250}
        minHeight={300}>
        {children}
      </Resizable>
    </Draggable>
  );
}
