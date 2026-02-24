import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CartProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#f5f5f0',
                border: '1px solid rgba(200,255,0,0.2)',
                fontFamily: '"Space Mono", monospace',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              },
              success: {
                iconTheme: { primary: '#c8ff00', secondary: '#0a0a0a' },
              },
              error: {
                iconTheme: { primary: '#ff3d00', secondary: '#0a0a0a' },
              },
            }}
          />
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
