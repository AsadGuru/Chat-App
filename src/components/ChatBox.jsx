import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import InputBox from './InputBox';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) setMessages(JSON.parse(savedMessages));

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.style.background = darkMode ? '#000' : '#fff';
    document.body.style.color = darkMode ? '#fff' : '#000';
  }, [darkMode]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    const newMessage = {
      id: Date.now(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className='w-full max-w-lg flex-col overflow-hidden rounded-2xl h-[40vh] justify-between items-center px-4 py-3 bg-blue-600 text-white dark:bg-gray-800'>
      <h2 className='font-semibold text-lg m-2 p-4 underline text-center'>Chat UI</h2>
      <div className='flex gap-2'>
        {/* <button onClick={() => setDarkMode(!darkMode)} className='bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white'>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button> */}
      </div>
      <button onClick={handleClear} className='bg-red-500 text-white px-2 py-1 rounded-2xl hover:bg-red-600'>
        Clear Chat
      </button>
      <div className='flex-1 overflow-y-auto px-4 py-2 space-y-3'>
        {messages.map((msg) => (
          <Message key={msg.id} text={msg.text} timestamp={msg.timestamp} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className='p-4 border-t dark:border-gray-700 gap-1'>
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
}
