import React, { useState } from 'react';

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), name: newItem, bought: false }]);
      setNewItem('');
    }
  };

  const toggleBought = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, bought: !item.bought } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Grocery List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="input input-bordered flex-1"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem} className="btn btn-primary">Add</button>
      </div>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center gap-2 p-2 bg-base-200 rounded">
            <input
              type="checkbox"
              checked={item.bought}
              onChange={() => toggleBought(item.id)}
              className="checkbox"
            />
            <span className={`flex-1 ${item.bought ? 'line-through text-gray-500' : ''}`}>
              {item.name}
            </span>
            <button onClick={() => deleteItem(item.id)} className="btn btn-sm btn-error">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
