import React, { useState } from 'react';
import '../style/style.css'
import SendIcon from '@mui/icons-material/Send';
const ChatbotInput = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputText);
    setInputText('');
  };

  return (
    <div className='inputWrapper'>
      <form data-testid="input-form" onSubmit={handleSubmit} className="inputContainer"> 
      <input
        data-testid="chat-input"
        className='input'
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={handleInputChange}
      />
      <button data-testid="send-icon" className='confirmButton' type="submit"><SendIcon style={{cursor:'pointer', color:'white'}}/></button>
    </form>
    </div>
    
  );
};
export default ChatbotInput