import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';

export default () => {
  return (
    <React.Suspense>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
