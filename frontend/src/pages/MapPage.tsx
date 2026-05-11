import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MapView from '../components/MapView';
import { restaurants as mockRestaurants, type Restaurant } from '../data/restaurants';
import { fetchRestaurants, seedDatabase } from '../api/api';

const MapPage: React.FC = () => {
  const [displayRestaurants, setDisplayRestaurants] = useState<Restaurant[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        let data = await fetchRestaurants();
        
        if (data.length === 0) {
          console.log('Database empty, seeding with mock data...');
          await seedDatabase(mockRestaurants);
          data = await fetchRestaurants();
        }

        const saved = localStorage.getItem('last_dinex_results');
        if (saved) {
          const filteredResults = JSON.parse(saved);
          setDisplayRestaurants(filteredResults);
          setIsFiltered(true);
        } else {
          setDisplayRestaurants(data.filter(r => r.rating >= 4.5));
          setIsFiltered(false);
        }
      } catch (error) {
        console.error('Error loading restaurants:', error);
        // Fallback to mock data if backend is down
        setDisplayRestaurants(mockRestaurants.filter(r => r.rating >= 4.5));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black text-white tracking-tight"
          >
            Explore {isFiltered ? <span className="text-primary-500 italic">Results</span> : <span className="text-primary-500 italic">Nearby</span>}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-muted mt-2 text-sm font-medium"
          >
            {isFiltered 
              ? `Showing the ${displayRestaurants.length} restaurants matching your preferences on the map.`
              : 'Discover top-rated dining spots across Pune on the interactive map.'}
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-4 border-primary-500/10 rounded-[3rem] p-2 bg-dark-surface shadow-2xl relative z-10"
        >
          <MapView 
            restaurants={displayRestaurants} 
            isSearchResult={isFiltered} 
          />
        </motion.div>
        
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-6 bg-dark-card border border-white/5 rounded-3xl">
            <h3 className="text-primary-500 font-black text-xs uppercase tracking-widest mb-1">Total Spots</h3>
            <p className="text-2xl font-black text-white">{displayRestaurants.length}</p>
          </div>
          <div className="p-6 bg-dark-card border border-white/5 rounded-3xl">
            <h3 className="text-primary-500 font-black text-xs uppercase tracking-widest mb-1">Avg Rating</h3>
            <p className="text-2xl font-black text-white">
              {(displayRestaurants.reduce((acc, r) => acc + r.rating, 0) / (displayRestaurants.length || 1)).toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;

