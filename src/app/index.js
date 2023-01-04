import './index.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import HomePage from './Pages/HomePage/HomePage';
import SignInPage from './Pages/SignInPage/SignInPage';
import UserPage from './Pages/UserPage/UserPage';

import store from '../state';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
