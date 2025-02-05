import React, { useState, useCallback } from "react";

// List Component
const List: React.FC<{ items: string[], removeItem: (index: number) => void }> = ({ items, removeItem }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item} <button onClick={() => removeItem(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

// Parent Component
const ParentComponent: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  // Memoize removeItem to avoid unnecessary re-renders
  const removeItem = useCallback((index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const addItem = () => {
    setItems((prevItems) => [...prevItems, `Item ${prevItems.length + 1}`]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <List items={items} removeItem={removeItem} />
    </div>
  );
};

export default ParentComponent;
