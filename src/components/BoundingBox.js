import React, { useState } from 'react';

const BoundingBox = ({ coordinates, onDraw }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { x1, y1, x2, y2 } = coordinates;

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const boundingBox = {
        x1,
        y1,
        x2: e.clientX,
        y2: e.clientY,
      };

      // Callback to parent component with the drawn bounding box
      onDraw(boundingBox);
    }
  };

  return (
    <div
      className="bounding-box"
      style={{
        position: 'absolute',
        left: `${x1}px`,
        top: `${y1}px`,
        width: `${x2 - x1}px`,
        height: `${y2 - y1}px`,
        border: '2px solid red',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

export default BoundingBox;
