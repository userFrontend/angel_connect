import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.scss';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // LocalStorage dan yozishmalarni yuklash
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // LocalStorage ga yozishmalarni saqlash
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Gemini API ni sozlash
  const genAI = new GoogleGenerativeAI("AIzaSyCGLewOuiQw3bdFLkXk-LDM9P0_mdIKzys"); // API kalitingizni qo'ying
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Model nomini yangilang

  // Javobni formatlash
  const formatResponse = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // Xabarni yuborish
  const handleSend = async () => {
    if (!input.trim()) return;

    // Foydalanuvchi xabarini chatga qo'shish
    const userMessage = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsLoading(true);

    try {
      // Gemini API dan javob olish
      const result = await model.generateContent(input);
      const botMessage = result.response.text();

      // Bot javobini chatga qo'shish
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isUser: false },
      ]);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Xatolik yuz berdi. Iltimos, keyinroq urunib ko\'ring.', isUser: false },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  // Avtomatik scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setShowScrollButton(false); // Scroll tugmasini yashirish
    }
  }, [messages]);

  // Scroll tugmasini bosganda chatni oxiriga olib borish
  const handleScrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll holatini tekshirish
  const checkScroll = () => {
    if (messagesEndRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesEndRef.current.parentElement;
      // Agar foydalanuvchi scroll qilgan bo'lsa, tugmani ko'rsatish
      setShowScrollButton(scrollHeight - (scrollTop + clientHeight) > 100);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="messages" onScroll={checkScroll}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.isUser ? 'user-message' : 'bot-message'}
            >
              {msg.isUser ? msg.text : formatResponse(msg.text)}
            </div>
          ))}
          {isLoading && <div className="loading">Yuklanmoqda...</div>}
          <div ref={messagesEndRef} /> {/* Scroll uchun bo'sh div */}
        </div>
        {showScrollButton && (
          <button className="scroll-button" onClick={handleScrollToBottom}>
            ↓
          </button>
        )}
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Xabar yozing..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading}>
            {isLoading ? 'Yuklanmoqda...' : 'Yuborish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;