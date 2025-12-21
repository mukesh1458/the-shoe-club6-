import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDiscountBadge from './components/StudentDiscountBadge';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageTransition } from './utils/animations';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
          </Route>
        </Routes>
      </AnimatePresence>
      <StudentDiscountBadge />
    </>
  );
};

export default App;
