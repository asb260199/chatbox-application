import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

const ChatBox = ({ boxId, messages, onSendMessage, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      onSendMessage(boxId, inputValue);
      setInputValue('');
    }
  };

  const scrollToBottom = () => {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  };

  return (
    <div className='chat-box'>
      <div ref={messageContainerRef} id={`message-container-${boxId}`} className='message-container'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === boxId ? 'self' : 'other'}`}
            style={{
              alignSelf: message.sender === boxId ? 'flex-start' : 'flex-end'
            }}
          >
            {message.message}
          </div>
        ))}
      </div>

      <div className='input-container'>
        <textarea className='input' placeholder='Type your message...' value={inputValue} onChange={handleInputChange} />
        <button className='send-button' onClick={handleSendMessage}>
          Send
        </button>
      </div>
      <button className='close-button' onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default ChatBox;
