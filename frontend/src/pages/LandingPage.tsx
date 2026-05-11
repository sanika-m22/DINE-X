import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { restaurants } from '../data/restaurants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % restaurants.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featured = restaurants[currentIdx];


  return (
    <div className="relative min-h-screen bg-dark-bg overflow-hidden flex flex-col">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero"
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-end px-6 pb-32 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold mb-8 text-primary-300">
            <Sparkles size={14} />
            <span>Premium Culinary Experience</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-[6rem] md:text-[10rem] font-black leading-none tracking-tighter text-white">
              Dine<span className="text-primary-500">X</span>
            </h1>
            <div className="h-1.5 w-32 bg-primary-500 mx-auto rounded-full mt-4 blur-[1px]"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl font-medium mb-12 tracking-wide text-primary-100/80 uppercase"
          >
            Discover the <span className="text-white font-bold">Perfect Taste</span>
          </motion.p>
          
          <p className="text-base md:text-lg text-text-muted mb-12 max-w-lg mx-auto leading-relaxed font-medium">
            Uncover the finest kitchens and hidden gems curated specifically for your palate.
          </p>



          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/preferences')}
              className="group btn-primary text-lg px-12 py-5 flex items-center gap-3 w-full sm:w-auto"
            >
              Start Exploring
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Preview Card (Like the image) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-20 right-10 hidden xl:block z-20"
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={featured.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-card/90 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl w-80"
          >
            <div className="h-48 rounded-3xl overflow-hidden mb-6">
              <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-xl font-bold mb-2">{featured.name}</h4>
            <div className="flex justify-between items-center text-sm">
              <span className="text-primary-500 font-bold">★ {featured.rating}</span>
              <span className="text-text-muted">{featured.cuisine[0]}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LandingPage;
