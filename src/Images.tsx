import { FC, useState } from 'react';
import Draggable from 'react-draggable';

interface ImagesProps {
  data: {
    src: string;
    title: string;
    description: string;
  }[];
  onClick: (index: number) => void;
}

const Images: FC<ImagesProps> = (props) => {
  const { data, onClick } = props;
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [boundingBoxes, setBoundingBoxes] = useState<{ x: number; y: number; width: number; height: number }[]>([]);
  const [xCoordinate, setXCoordinate] = useState<number>(0);
  const [yCoordinate, setYCoordinate] = useState<number>(0);
  const [boxWidth, setBoxWidth] = useState<number>(50); // Initial width of the bounding box
  const [boxHeight, setBoxHeight] = useState<number>(50); // Initial height of the bounding box

  const handleClickImage = (index: number) => {
    onClick(index);
    setFullscreenIndex(index);
    setBoundingBoxes([]); // Clear existing bounding boxes on image click
  };

  const handleCloseFullscreen = () => {
    setFullscreenIndex(null);
    setBoundingBoxes([]); // Clear bounding boxes on closing fullscreen
  };

  const handleAddBoundingBox = () => {
    // Adjusting coordinates to have (0,0) at the middle of the image
    const adjustedX = xCoordinate - boxWidth / 2;
    const adjustedY = yCoordinate - boxHeight / 2;

    setBoundingBoxes((prevBoxes) => [
      ...prevBoxes,
      { x: adjustedX, y: adjustedY, width: boxWidth, height: boxHeight },
    ]);
  };

  const handleBoundingBoxDrag = (index: number, newPosition: { x: number; y: number }) => {
    setBoundingBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      updatedBoxes[index] = { ...updatedBoxes[index], ...newPosition };
      return updatedBoxes;
    });
  };

  return (
    <div className='images-container'>
      {data.map((slide, index) => (
        <div
          onClick={() => handleClickImage(index)}
          key={index}
          className='image'
        >
          <img src={slide.src} alt={slide.description} />
        </div>
      ))}

      {fullscreenIndex !== null && (
        <div className='fullscreen-overlay'>
          {/* Render the full-screen image */}
          <img src={data[fullscreenIndex].src} alt={data[fullscreenIndex].description} />

          {/* Draggable bounding boxes */}
          {boundingBoxes.map((box, index) => (
            <Draggable
              key={index}
              position={{ x: box.x, y: box.y }}
              onDrag={(e, data) => handleBoundingBoxDrag(index, data)}
            >
              <div className='bounding-box'>
                <div
                  className='box-visual'
                  style={{
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                    border: '2px solid #ff0000', // Red border for the box visual
                    position: 'absolute',
                    top: `calc(50% + ${box.y}px - ${box.height / 2}px)`, // Adjusted to box coordinates with respect to the center
                    left: `calc(50% + ${box.x}px - ${box.width / 2}px)`, // Adjusted to box coordinates with respect to the center
                  }}
                ></div>
                <div className='box-coordinates'>
                  <div className='coordinates-box'>
                    X: {box.x + box.width / 2}, <br />
                    Y: {box.y + box.height / 2}, <br />
                    Width: {box.width}, <br />
                    Height: {box.height}
                  </div>
                </div>
              </div>
            </Draggable>
          ))}

          {/* Close button */}
          <button onClick={handleCloseFullscreen}>Close</button>

          {/* Input for adding new bounding box */}
          <div>
            <label>X Coordinate:</label>
            <input
              type='number'
              value={xCoordinate}
              onChange={(e) => setXCoordinate(parseInt(e.target.value, 10))}
            />
            <br />
            <label>Y Coordinate:</label>
            <input
              type='number'
              value={yCoordinate}
              onChange={(e) => setYCoordinate(parseInt(e.target.value, 10))}
            />
            <br />
            <label>Box Width:</label>
            <input
              type='number'
              value={boxWidth}
              onChange={(e) => setBoxWidth(parseInt(e.target.value, 10))}
            />
            <br />
            <label>Box Height:</label>
            <input
              type='number'
              value={boxHeight}
              onChange={(e) => setBoxHeight(parseInt(e.target.value, 10))}
            />
            <br />
            <button onClick={handleAddBoundingBox}>
              Add Bounding Box
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;
