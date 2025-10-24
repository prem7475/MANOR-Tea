import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/custom.css';
import './styles/phone-responsive.css';
import './styles/laptop-responsive.css';
import App from './App.jsx';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { CartProvider } from './hooks/useCart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
