import React, { useState } from 'react';
import axios from 'axios';
import ChatbotInput from './input';

export const Home = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatbotSubmit = async (message) => {
    try {
      setChatHistory([...chatHistory, { role: 'user', content: message }]);
 
      const response = await axios.post('http://127.0.0.1:8000/sendMessage', { message });
      console.log(response);
      const chatbotResponse = response.data;

      setChatHistory([...chatHistory, { role: 'user', content: message }, { role: 'chatbot', content: chatbotResponse }]);
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
