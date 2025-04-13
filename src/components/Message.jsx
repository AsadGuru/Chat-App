import React from 'react';

export default function Message({ text, timestamp }) {
  return (
    <div className='flex justify-end'>
      <div className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow max-w-xs'>
        <p className='text-sm'>
          {text}
        </p>
      <p className='text-xs text-right opacity-80 mt-1'>{timestamp}</p>
      </div>
    </div>
  );
}
