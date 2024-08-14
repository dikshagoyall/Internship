import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import './Card.css'; // Keep any custom styles here

const Card = ({ id, text, x, y, initialWidth, initialHeight, onDelete }) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [showModal, setShowModal] = useState(false);

  const handleResize = (e, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const maxTextLength = 30; // Adjust based on your needs
  const displayedText = text.substring(0, maxTextLength) + (text.length > maxTextLength ? '...' : '');

  return (
    <>
      <Draggable
        defaultPosition={{ x, y }}
        bounds="parent"
        cancel=".react-resizable-handle"
      >
        <div
          className="card"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            position: 'absolute',
          }}
        >
          <ResizableBox
            width={width}
            height={height}
            minConstraints={[100, 50]}
            maxConstraints={[Infinity, Infinity]}
            onResize={handleResize}
            className="resizable-box"
            resizeHandles={['se']}
          >
            <div className="card-content">
              <button onClick={handleDelete} className="btn btn-danger btn-sm delete-button">×</button>
              <p>{displayedText}</p>
              {text.length > maxTextLength && (
                <button onClick={toggleModal} className="btn btn-info btn-sm show-more-button">Show More</button>
              )}
              <div className="resizer" />
            </div>
          </ResizableBox>
        </div>
      </Draggable>

      {showModal && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{text}</p>
            <button onClick={toggleModal} className="btn btn-secondary close-button">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
