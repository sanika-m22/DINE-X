import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Bookmark, User, Plus, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';


const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={24} />, path: '/', label: 'Home' },
    { icon: <Search size={24} />, path: '/preferences', label: 'Search' },
    { icon: <Plus size={24} />, path: '/add', label: 'Add', isCenter: true },
    { icon: <MapIcon size={24} />, path: '/explore', label: 'Map' }, // Map link
    { icon: <User size={24} />, path: '/profile', label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[9999] px-6">
      <div className="max-w-md mx-auto nav-blur rounded-full px-6 py-4 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center transition-all duration-300 relative group ${
                item.isCenter 
                  ? 'bg-primary-500 text-white p-4 rounded-full -mt-12 shadow-xl shadow-orange-500/40 hover:scale-110 active:scale-90' 
                  : isActive 
                    ? 'text-primary-500 scale-110' 
                    : 'text-text-muted hover:text-text-main'
              }`}
            >
              {item.icon}
              {!item.isCenter && isActive && (
                <motion.div 
                  layoutId="nav-dot"
                  className="absolute -bottom-2 w-1 h-1 bg-primary-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

};

export default BottomNav;
