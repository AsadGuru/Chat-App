import React, { useState } from 'react';

export default function InputBox({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
        className='flex-1 px-4 py-2 rounded-full border dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700'>Send</button>
    </form>
  );
}
