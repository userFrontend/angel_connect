import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Chatbot from '../../components/Chatbot/Chatbot';
import HRPanel from '../../components/HRpanel/HRpanel';
import Header from '../../components/Header/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-content">
        <h1>SmartBiz Connect Platformasiga Xush Kelibsiz!</h1>
        <Chatbot />
        <HRPanel />
      </div>
    </div>
  );
};

export default Home;