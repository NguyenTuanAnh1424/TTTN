import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import App from './App.jsx';
import './index.css';

/**
 * Điểm khởi chạy (Entry Point) của Ứng dụng Frontend ReactJS
 * Tích hợp Redux Store Provider và React Router DOM BrowserRouter
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Cung cấp Redux Store cho toàn bộ các Component trong ứng dụng */}
    <Provider store={store}>
      {/* Định tuyến điều hướng URL trang web */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
