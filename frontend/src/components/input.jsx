import React, { useState } from 'react';
import '../style/style.css'
import SendIcon from '@mui/icons-material/Send';
const ChatbotInput = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');
  const [maxInputText, setMaxInputText] = useState(50);

  const handleInputChange = (event) => {    
    setInputText(event.target.value);
  };
  const handleMaxInputChange = (event) => {
    setMaxInputText(event.target.value);
  };
  const handleSubmit = (event) => {
    if(inputText===''){
      alert("Type your message!")
    }
    else if(maxInputText==='' || !Number.isInteger(maxInputText)){
      alert("Correct max tokens!")
    }
    else{
      event.preventDefault();
      onSubmit({inputText, maxInputText});
      setInputText('');
    }
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
    <div className="max-tokens">
      <span>Max Tokens</span>
    <input
        data-testid="chat-input-1"
        className='input-max'
        type="number"
        value={maxInputText}
        onChange={handleMaxInputChange}
      /></div>
    
    </div>
    
  );
};
export default ChatbotInput