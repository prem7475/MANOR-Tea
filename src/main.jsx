import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/custom.css';
import './styles/phone-responsive.css';
import './styles/laptop-responsive.css';
import App from './App.jsx';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { CartProvider } from './hooks/useCart.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { FavouritesProvider } from './context/FavouritesContext.jsx';
import { LoyaltyProvider } from './context/LoyaltyContext.jsx';
import { RecommendationProvider } from './context/RecommendationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavouritesProvider>
          <LoyaltyProvider>
            <RecommendationProvider>
              <ThemeProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </ThemeProvider>
            </RecommendationProvider>
          </LoyaltyProvider>
        </FavouritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
