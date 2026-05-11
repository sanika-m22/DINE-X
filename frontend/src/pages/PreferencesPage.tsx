import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ChefHat, Wallet, Star, ChevronLeft } from 'lucide-react';

const cuisines = [
  { name: 'Indian', emoji: '🍛' },
  { name: 'Chinese', emoji: '🥡' },
  { name: 'Italian', emoji: '🍝' },
  { name: 'Fast Food', emoji: '🍔' },
  { name: 'Japanese', emoji: '🍣' },
  { name: 'Mexican', emoji: '🌮' },
  { name: 'Continental', emoji: '🥩' },
];

const PreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(1000);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(4.0);
  const [location, setLocation] = useState('Pune');

  const toggle = (c: string) =>
    setSelectedCuisines(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-text-muted hover:text-white mb-8 font-bold text-xs uppercase tracking-widest transition-colors">
          <ChevronLeft size={16} /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <h2 className="text-3xl font-black text-white mb-2">Your Preferences</h2>
          <p className="text-text-muted mb-10 text-sm">Tell us what you're craving.</p>

          <form onSubmit={(e) => { 
            e.preventDefault(); 
            navigate('/results', { state: { location, budget, selectedCuisines, minRating } }); 
          }} className="space-y-10">
            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest mb-4">
                <MapPin size={16} className="text-primary-500" /> Location
              </label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field" placeholder="Enter city or area" />
            </div>

            {/* Budget */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
                  <Wallet size={16} className="text-primary-500" /> Budget (Per Person)
                </label>
                <span className="text-primary-500 font-black text-xl">₹{budget}</span>
              </div>
              <input type="range" min="100" max="5000" step="50" value={budget}
                onChange={(e) => setBudget(+e.target.value)}
                className="w-full h-1.5 bg-dark-surface rounded-full appearance-none cursor-pointer accent-primary-500" />
              <div className="flex justify-between text-xs text-text-muted mt-2"><span>₹100</span><span>₹5000</span></div>
            </div>


            {/* Cuisine */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest mb-4">
                <ChefHat size={16} className="text-primary-500" /> Cuisines
              </label>
              <div className="flex flex-wrap gap-3">
                {cuisines.map(({ name, emoji }) => (
                  <button key={name} type="button" onClick={() => toggle(name)}
                    className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      selectedCuisines.includes(name)
                        ? 'bg-primary-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-dark-surface border border-white/10 text-text-muted hover:border-primary-500/50'
                    }`}>
                    <span>{emoji}</span>{name}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
                  <Star size={16} className="text-primary-500" /> Min Rating
                </label>
                <span className="text-primary-500 font-black text-xl">{minRating} ⭐</span>
              </div>
              <input type="range" min="3.0" max="5.0" step="0.1" value={minRating}
                onChange={(e) => setMinRating(+e.target.value)}
                className="w-full h-1.5 bg-dark-surface rounded-full appearance-none cursor-pointer accent-primary-500" />
              <div className="flex justify-between text-xs text-text-muted mt-2"><span>3.0</span><span>5.0</span></div>
            </div>

            <button type="submit" className="w-full btn-primary text-lg py-6 mt-4 font-black tracking-wide shadow-xl shadow-orange-500/20">
              Find My Match →
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PreferencesPage;
