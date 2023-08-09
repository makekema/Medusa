import React from 'react';
import { Resizable } from 're-resizable';

type IResizableComponentProps = {
  children: React.ReactNode;
  position: {
    top: string;
    left: string;
  };
};

export default function ResizableComponent({
  children,
  position,
}: IResizableComponentProps) {
  return (
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
  );
}
