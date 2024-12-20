"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MenuForm({ menuItem }) {
  // Initialize state for the form fields
  const [name, setName] = useState('');
  const [depth, setDepth] = useState(0);
  const [parentId, setParentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Whenever the menuItem prop changes, update the form state with its data
  useEffect(() => {
    if (menuItem) {
      console.log(menuItem)
      setName(menuItem.name || '');
      setDepth(menuItem.depth || 0);
      setParentId(menuItem.parentId || '');
    }
  }, [menuItem]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'depth') setDepth(value);
    if (name === 'parentId') setParentId(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let depthInt = parseInt(depth);
    console.log('Depth:', depthInt);

    try {
      // Send data to the backend API to save menu item
      const response = await axios.post('http://localhost:8000/menu', {
        name,
        depth: depthInt,
        parentId,
      });

      console.log('Menu saved successfully:', response.data);
    } catch (err) {
      setError('Failed to save menu. Please try again.');
      console.error('Error saving menu:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 p-4 border rounded-md shadow">
      <h2 className="font-bold text-lg mb-4">Edit Menu</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600">Menu ID</label>
          <input
            type="text"
            value={menuItem ? menuItem.id : 'Loading...'} // Dynamically show Menu ID
            readOnly
            className="w-full p-2 border rounded bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <label className="block text-gray-600">Depth</label>
          <input
            type="number"
            name="depth"
            value={depth}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-600">Parent Data</label>
          <input
            type="text"
            name="parentId"
            value={parentId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
