import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import { StoreProvider } from './Store';


ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

