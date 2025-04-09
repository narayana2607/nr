import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import chatbotIcon from '../assets/chatboticon.jpeg';

import './Chatbot.css';

const ChatbotIcon = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot", timestamp: new Date() },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  const [voiceInputActive, setVoiceInputActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Enhanced knowledge base with multi-language support
  const knowledgeBase = {
    en: {
      greeting: ["Hello!", "Hi there!", "Greetings!", "How can I help you today?"],
      help: ["I can help you navigate the website.", "Ask me about the different sections available."],
      features: [
        "This site has portfolio, student info, food gallery, and more!",
        "You can explore employee data, product pages, and YouTube integration."
      ],
      default: [
        "I'm not sure I understand. Could you rephrase that?",
        "I'm still learning. Try asking about specific pages.",
        "You can type 'help' to see what I can do."
      ]
    },
    es: {
      greeting: ["¡Hola!", "¿Cómo estás?", "Buenos días!"],
      help: ["Puedo ayudarte a navegar por el sitio web.", "Pregúntame sobre las diferentes secciones disponibles."],
      features: [
        "Este sitio tiene portafolio, información de estudiantes, galería de comida y más!",
        "Puedes explorar datos de empleados, páginas de productos e integración con YouTube."
      ],
      default: [
        "No estoy seguro de entender. ¿Podrías reformular eso?",
        "Todavía estoy aprendiendo. Intenta preguntar sobre páginas específicas.",
        "Puedes escribir 'ayuda' para ver lo que puedo hacer."
      ]
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = selectedLanguage;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserMessage(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setVoiceInputActive(false);
      };

      recognitionRef.current.onend = () => {
        setVoiceInputActive(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage]);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
    if (!isChatbotVisible) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSuggestions = () => {
    setSuggestionsVisible(!suggestionsVisible);
  };

  const toggleVoiceInput = () => {
    if (voiceInputActive) {
      recognitionRef.current.stop();
      setVoiceInputActive(false);
    } else {
      recognitionRef.current.start();
      setVoiceInputActive(true);
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const getRandomResponse = (category) => {
    const options = knowledgeBase[selectedLanguage][category] || knowledgeBase[selectedLanguage].default;
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleSendMessage = (text = null) => {
    const messageToSend = text || userMessage;
    
    if (messageToSend.trim() !== "") {
      const newUserMessage = { 
        text: messageToSend, 
        sender: "user", 
        timestamp: new Date() 
      };
      
      setMessages((prev) => [...prev, newUserMessage]);
      setUserMessage("");
      setIsTyping(true);

      if (!isChatbotVisible) {
        setUnreadCount(prev => prev + 1);
      }

      const messageLower = messageToSend.toLowerCase();
      let navigated = false;

      // Keyword-based routing
      const keywordMap = {
        portfolio: "/portfolio",
        student: "/studentinfo",
        about: "/about",
        gallery: "/gallery",
        food: "/foodhome",
        sheet: "/excelsheet",
        home: "/home",
        age: "/age",
        product: "/productpage",
        employee: "/employee",
        youtube: "/yt",
        status: "/status",
      };

      // Check for greetings
      if (['hello', 'hi', 'hey', 'hola', 'buenos días'].some(word => messageLower.includes(word))) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: getRandomResponse('greeting'), sender: "bot", timestamp: new Date() },
          ]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // Check for help requests
      if (messageLower.includes('help') || messageLower.includes('ayuda')) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: getRandomResponse('help'), sender: "bot", timestamp: new Date() },
          ]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // Check for features inquiry
      if (['what can you do', 'features', 'options', 'qué puedes hacer'].some(phrase => messageLower.includes(phrase))) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: getRandomResponse('features'), sender: "bot", timestamp: new Date() },
          ]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // Navigation logic
      for (const [keyword, route] of Object.entries(keywordMap)) {
        if (messageLower.includes(keyword)) {
          setTimeout(() => navigate(route), 1200);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { text: `Taking you to the ${keyword} page...`, sender: "bot", timestamp: new Date() },
            ]);
            setIsTyping(false);
          }, 1000);
          navigated = true;
          break;
        }
      }

      if (!navigated) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { text: getRandomResponse('default'), sender: "bot", timestamp: new Date() },
          ]);
          setIsTyping(false);
        }, 1000);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { text: getRandomResponse('greeting'), sender: "bot", timestamp: new Date() },
    ]);
  };

  const saveChat = () => {
    setChatHistory([...chatHistory, { 
      date: new Date(), 
      messages: messages.filter(msg => msg.sender !== 'bot' || !msg.text.includes('Quick Options:'))
    }]);
    setMessages([
      { text: "Chat saved! How else can I help?", sender: "bot", timestamp: new Date() },
    ]);
  };

  const loadChat = (index) => {
    if (chatHistory[index]) {
      setMessages([
        { text: "Loaded previous conversation:", sender: "bot", timestamp: new Date() },
        ...chatHistory[index].messages
      ]);
    }
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.sender === 'user' ? 'You' : 'Bot'}: ${msg.text} (${formatTime(msg.timestamp)})`
    ).join('\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Quick suggestions based on context
  const getQuickSuggestions = () => {
    const lastMessage = messages[messages.length - 1]?.text.toLowerCase() || '';
    
    if (lastMessage.includes('help') || lastMessage.includes('ayuda')) {
      return ["Show features", "Navigation help", "What can you do?"];
    }
    
    if (lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('hola')) {
      return ["What can you do?", "Show quick links", "Change language"];
    }
    
    return ["Ask for help", "Show quick links", "What's new?"];
  };

  return (
    <>
      {/* Floating Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <img src={chatbotIcon} alt="Chatbot Icon" />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </div>

      {/* Chatbot UI */}
      {isChatbotVisible && (
        <div className={`chatbot-container ${darkMode ? 'dark-mode' : ''} ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="header-left">
              <h3>AI Assistant</h3>
              <span className="status-indicator">
                {isTyping ? 'Typing...' : 'Online'}
                {voiceInputActive && ' 🎤'}
              </span>
            </div>
            <div className="header-right">
              <select 
                value={selectedLanguage} 
                onChange={handleLanguageChange}
                className="language-selector"
              >
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Español</option>
              </select>
              <button onClick={toggleDarkMode} className="icon-button">
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button onClick={toggleMinimize} className="icon-button">
                {isMinimized ? '🗖' : '🗕'}
              </button>
              <button onClick={toggleChatbot} className="icon-button close-chatbot">
                ✕
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="chatbot-body">
                <div className="chatbot-messages">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.sender}-message`}
                    >
                      <div className="message-content">
                        {message.text}
                        <span className="message-time">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message bot-message">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick navigation options */}
                {suggestionsVisible && (
                  <div className="quick-options">
                    <div className="quick-suggestions">
                      {getQuickSuggestions().map((suggestion, index) => (
                        <button 
                          key={index} 
                          onClick={() => {
                            setUserMessage(suggestion);
                            inputRef.current.focus();
                          }}
                          className="suggestion-button"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                    <p>Quick Navigation:</p>
                    <div className="quick-buttons">
                      <button onClick={() => navigate("/portfolio")}>📄 Portfolio</button>
                      <button onClick={() => navigate("/studentinfo")}>🎓 Student</button>
                      <button onClick={() => navigate("/foodhome")}>🍔 Food</button>
                      <button onClick={() => navigate("/excelsheet")}>📊 Sheet</button>
                      <button onClick={() => navigate("/employee")}>🧑‍💼 Employee</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="chatbot-footer">
                <div className="input-container">
                  <button 
                    onClick={toggleVoiceInput} 
                    className={`voice-button ${voiceInputActive ? 'active' : ''}`}
                    title="Voice input"
                  >
                    🎤
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message here..."
                    className="chatbot-input"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button className="send-button" onClick={() => handleSendMessage()}>
                    Send
                  </button>
                </div>
                <div className="chat-actions">
                  <button onClick={toggleSuggestions} className="action-button">
                    {suggestionsVisible ? 'Hide Suggestions' : 'Show Suggestions'}
                  </button>
                  <button onClick={clearChat} className="action-button">
                    Clear
                  </button>
                  {chatHistory.length > 0 && (
                    <select 
                      onChange={(e) => loadChat(e.target.value)} 
                      className="history-selector"
                      title="Load previous chat"
                    >
                      <option value="">Load chat...</option>
                      {chatHistory.map((chat, index) => (
                        <option key={index} value={index}>
                          {chat.date.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  )}

                  <button onClick={exportChat} className="action-button">
                    Export
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotIcon;