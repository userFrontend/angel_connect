import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.scss';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Yuklash holati

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

  const handleSend = async () => {
    if (!input.trim()) return; // Bo'sh xabar yubormaslik uchun

    // Foydalanuvchi xabarini chatga qo'shish
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, isUser: true },
    ]);

    setIsLoading(true); // Yuklashni boshlash

    try {
      // Gemini API dan javob olish
      const result = await model.generateContent(input);
      const botMessage = result.response.text(); // Bot javobi

      // Bot javobini chatga qo'shish
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isUser: false },
      ]);
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
      // Xatolikni foydalanuvchiga ko'rsatish
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Xatolik yuz berdi. Iltimos, keyinroq urunib ko\'ring.', isUser: false },
      ]);
    } finally {
      setIsLoading(false); // Yuklashni tugatish
      setInput(''); // Input maydonini tozalash
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.isUser ? 'user-message' : 'bot-message'}
          >
            {msg.isUser ? msg.text : formatResponse(msg.text)}
          </div>
        ))}
        {isLoading && <div className="loading">Yuklanmoqda...</div>} {/* Yuklash animatsiyasi */}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Xabar yozing..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Enter bosganda xabar yuborish
          disabled={isLoading} // Yuklash paytida inputni o'chirish
        />
        <button onClick={handleSend} disabled={isLoading}> {/* Yuklash paytida tugmani o'chirish */}
          {isLoading ? 'Yuklanmoqda...' : 'Yuborish'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;