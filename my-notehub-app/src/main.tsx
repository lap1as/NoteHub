import React from 'react';
import ReactDOM from 'react-dom/client'; // Зміна імпорту на createRoot
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Імпортуємо BrowserRouter

// Зміна рендерингу на createRoot
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Додаємо BrowserRouter тут */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
