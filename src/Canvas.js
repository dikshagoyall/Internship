import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import './Canvas.css'; // Keep any custom styles here

const Canvas = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Mumbai: Mumbai, India’s financial powerhouse, is famous for its bustling energy and cultural diversity. Known as the heart of Bollywood, it boasts landmarks like the Gateway of India and Marine Drive. The city combines colonial architecture with modern skyscrapers and has a dynamic nightlife and culinary scene. Its local trains are vital for commuting, and the annual Ganesh Chaturthi festival adds vibrant colors to the cityscape.', x: 100, y: 100, initialWidth: 200, initialHeight: 100 },
    { id: 2, text: 'Banglore: Bangalore, or Bengaluru, is Indias leading tech hub, often called the "Silicon Valley of India" due to its thriving IT industry and startup culture. The city is known for its pleasant climate and abundant greenery. It blends traditional elements with modernity, offering a vibrant entrepreneurial scene and a rich cultural life. Bangalore’s innovative spirit and dynamic atmosphere make it a prominent urban center.', x: 320, y: 100, initialWidth: 200, initialHeight: 100 },
    { id: 3, text: 'Kolkata: Kolkata, once Calcutta, is renowned for its rich history and cultural depth. The city features grand colonial buildings like the Victoria Memorial and is celebrated for its literary heritage, including Nobel laureate Rabindranath Tagore. Festivals like Durga Puja showcase its vibrant traditions, while the local tram system and delectable Bengali sweets add to its charm. Kolkata remains a hub of intellectual and cultural activity.', x: 540, y: 100, initialWidth: 200, initialHeight: 100 }
  ]);

  const [newCardText, setNewCardText] = useState('');

  const canvasRef = useRef(null);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize(); // Set initial size

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const addCard = () => {
    const cardText = prompt("Enter text for the new card:");
    if (cardText) {
      const lastCard = cards[cards.length - 1];
      const canvas = canvasRef.current;

      const nextX = lastCard ? lastCard.x + lastCard.initialWidth + 20 : 100;
      const nextY = lastCard ? lastCard.y : 100;

      const newX = nextX + 200 > canvas.offsetWidth ? 100 : nextX;
      const newY = nextX + 200 > canvas.offsetWidth ? nextY + lastCard.initialHeight + 20 : nextY;

      const newCard = {
        id: cards.length + 1,
        text: cardText,
        x: newX,
        y: newY,
        initialWidth: 200,
        initialHeight: 100
      };

      setCards([...cards, newCard]);
    }
  };

  return (
    <div className="canvas" ref={canvasRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          x={card.x}
          y={card.y}
          initialWidth={card.initialWidth}
          initialHeight={card.initialHeight}
          onDelete={handleDelete}
        />
      ))}
      <button onClick={addCard} className="btn btn-primary position-fixed bottom-0 end-0 m-3">Add Card</button>
    </div>
  );
};

export default Canvas;
