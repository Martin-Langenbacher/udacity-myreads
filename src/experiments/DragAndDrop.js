import { useState } from "react";

const DragAndDrop = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(items[index]);
    e.dataTransfer.setData("text/plain", ""); // Required for some browsers
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const newItems = [...items];
    newItems.splice(index, 0, draggedItem); // Insert the dragged item at the new position
    setItems(newItems);
    setDraggedItem(null);
  };

  return (
    <div>
      <h2>Drag and Drop Example only</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DragAndDrop;
