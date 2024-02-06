import React, { useState } from 'react';
import axios from 'axios';
import ChatbotInput from './input';

export const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatbotSubmit = async (message) => {
    const {inputText,maxInputText}=message
    try {
      setChatHistory([...chatHistory, { role: 'user', content: inputText }]);
      const response = await axios.post('http://127.0.0.1:8000/sendMessage', { inputText , maxInputText});
      const chatbotResponse = response.data;
      setChatHistory([...chatHistory, { role: 'user', content: inputText }, { role: 'chatbot', content: chatbotResponse }]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error.message);
    }
  };

  return (
    <div className='chat' data-testid='home-component'>
      <div className='chatContent' data-testid='chat-history'>
        {chatHistory.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <ChatbotInput onSubmit={handleChatbotSubmit} />
    </div>
  );
};

export default Home;
