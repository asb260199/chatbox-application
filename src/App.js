import './App.css';
import React, { useState } from 'react';
import ChatBox from './components/ChatBox';

const App = () => {
  const [Boxes, setBoxes] = useState([]);

  const handleAddBox = () => {
    setBoxes([...Boxes, { id: Math.random().toString(), messages: [] }]);
  };

  const handleRemoveBox = boxId => {
    setBoxes(Boxes.filter(box => box.id !== boxId));
  };

  const handleSendMsg = (boxId, message) => {
    const updatedBoxes = Boxes.map(box => {
      return {
        ...box,
        messages: [...box.messages, { sender: boxId, message }]
      };
    });
    setBoxes(updatedBoxes);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-logo'>
          {/* <img src='logo192.png' alt='Logo' /> */}
          <h1 className='navbar-title'>ChatBox - Chat for Fun</h1>
        </div>
      </nav>
      <button className='add-button' onClick={handleAddBox}>
        Add Chat Box
      </button>
      <div className='app'>
        <div className='chat-box-container'>
          {Boxes.map(box => (
            <ChatBox key={box.id} boxId={box.id} messages={box.messages} onSendMessage={handleSendMsg} onClose={() => handleRemoveBox(box.id)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
