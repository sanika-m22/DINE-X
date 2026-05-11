import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PreferencesPage from './pages/PreferencesPage';
import ResultsPage from './pages/ResultsPage';
import AddPage from './pages/AddPage';
import SavedPage from './pages/SavedPage';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import Navbar from './components/Navbar';

import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  return (
    <Router basename="/DineX/">
      <div className="min-h-screen bg-dark-bg text-text-main font-sans selection:bg-primary-500/30 pb-24">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/preferences" 
            element={<><Navbar /><PreferencesPage /><BottomNav /></>} 
          />
          <Route 
            path="/results" 
            element={<><Navbar /><ResultsPage /><BottomNav /></>} 
          />
          <Route 
            path="/explore" 
            element={<><Navbar /><MapPage /><BottomNav /></>} 
          />
          <Route 
            path="/add" 
            element={<><Navbar /><AddPage /><BottomNav /></>} 
          />
          <Route 
            path="/saved" 
            element={<><Navbar /><SavedPage /><BottomNav /></>} 
          />
          <Route 
            path="/profile" 
            element={<><Navbar /><ProfilePage /><BottomNav /></>} 
          />
          <Route 
            path="/restaurant/:id" 
            element={<><Navbar /><RestaurantDetailsPage /><BottomNav /></>} 
          />

        </Routes>

      </div>
    </Router>
  );
};

export default App;
