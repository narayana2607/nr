import React, { useState } from 'react';
import chatbotIcon from '../assets/chatboticon.jpeg'; // Import the image
import './ChatbotIcon.css';

const ChatbotIcon = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const handleSendMessage = () => {
    if (userMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "user" },
      ]);
      setUserMessage("");

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a simple AI response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <img src={chatbotIcon} alt="Chatbot Icon" />
      </div>

      {/* Chatbot UI */}
      {isChatbotVisible && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>AI Chatbot</h3>
            <button onClick={toggleChatbot} className="close-chatbot">
              X
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender}-message`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type your message here..."
              className="chatbot-input"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotIcon;
