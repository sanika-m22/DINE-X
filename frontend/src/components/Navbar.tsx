import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Utensils } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 px-6 h-16 flex justify-between items-center max-w-7xl mx-auto">
      <div onClick={() => navigate('/')} className="flex items-center gap-2 font-black text-xl cursor-pointer">
        <div className="bg-primary-500 p-1.5 rounded-xl text-white"><Utensils size={18} /></div>
        <span className="text-white">DineX</span>
      </div>
      <div className="flex items-center gap-3">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const query = (e.currentTarget.elements[0] as HTMLInputElement).value;
            if (query) navigate('/results', { state: { query } });
          }}
          className="hidden md:flex items-center gap-3 px-4 py-2 bg-dark-surface rounded-full border border-white/10 text-text-muted text-sm focus-within:border-primary-500/50 transition-all"
        >
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search cuisines..." 
            className="bg-transparent border-none outline-none text-white w-48 placeholder:text-text-muted"
          />
        </form>
        
        <button 
          onClick={() => alert('Notifications coming soon!')}
          className="w-10 h-10 bg-dark-surface border border-white/10 rounded-full flex items-center justify-center text-text-muted hover:text-white hover:border-white/20 transition-all"
        >
          <Bell size={18} />
        </button>
        
        <div 
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500 cursor-pointer hover:scale-105 transition-transform"
        >
          <img src="https://i.pravatar.cc/100?img=47" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
