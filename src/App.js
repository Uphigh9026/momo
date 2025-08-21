// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CategoryCloset from './pages/CategoryCloset';
import CategoryCurtain from './pages/CategoryCurtain';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CommunityPage from './pages/CommunityPage';
import PollPage from './pages/PollPage';
import ReviewPage from './pages/ReviewPage';
import CategoryDetail from './pages/CategoryDetail';
import EstimateStart from './pages/EstimateStart';
import EstimateForm from './pages/EstimateForm';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
                  <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/붙박이장" element={<CategoryCloset />} />
              <Route path="/category/커튼" element={<CategoryCurtain />} />
              <Route path="/category/:categoryName" element={<CategoryDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/complex/:id/community" element={<CommunityPage />} />
              <Route path="/poll" element={<PollPage />} />
              <Route path="/feed" element={<ReviewPage />} />
              <Route path="/reviews" element={<ReviewPage />} />
              <Route path="/estimate/start" element={<EstimateStart />} />
              <Route path="/estimate/form" element={<EstimateForm />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
