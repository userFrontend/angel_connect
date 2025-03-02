import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { InfoProvider } from './context/infoContext';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="789088637781-ge6oemp6bjpeefhkcdfeboq7ov7kljpu.apps.googleusercontent.com">
        <InfoProvider>
          <App />
        </InfoProvider>
    </GoogleOAuthProvider> 
  </BrowserRouter>  
);
