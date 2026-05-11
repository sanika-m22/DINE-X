import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Star, MapPin, IndianRupee, Clock, Phone, Navigation, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { restaurants } from '../data/restaurants';

const RestaurantDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurants.find(r => r.id === id);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Restaurant not found</h2>
          <button onClick={() => navigate(-1)} className="btn-primary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pb-32">


      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src={restaurant.image} 
          className="w-full h-full object-cover" 
          alt={restaurant.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-black/40" />
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-6 w-12 h-12 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-500 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 -mt-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card border border-white/5 rounded-[3rem] p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">{restaurant.name}</h1>
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <div className="flex items-center gap-1 text-primary-400 font-bold">
                    <Star size={16} fill="currentColor" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee size={14} />
                    <span>{restaurant.budget} <span className="text-[10px] uppercase font-black tracking-tighter opacity-60">per person</span></span>
                  </div>
                </div>
              </div>
              <div className="bg-primary-500/10 text-primary-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-500/20">
                {restaurant.cuisine[0]}
              </div>
            </div>


            <div className="flex items-center gap-2 text-text-muted mb-8 text-sm">
              <MapPin size={16} className="text-primary-500" />
              <span>{restaurant.location}, Pune</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <button 
                onClick={() => window.location.href = 'tel:+919876543210'}
                className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-bold text-sm text-white"
              >
                <Phone size={18} className="text-primary-500" /> Call
              </button>
              <button 
                onClick={() => {
                  const query = `${restaurant.name}, ${restaurant.location}`;
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
                    '_blank'
                  );
                }}
                className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-bold text-sm text-white"
              >
                <Navigation size={18} className="text-primary-500" /> Directions
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tighter">The Vibe</h3>
                <p className="text-text-muted leading-relaxed">
                  Experience a culinary journey at {restaurant.name}. Known for its premium ambiance and authentic {restaurant.cuisine.join(' & ')} flavors, 
                  it's the perfect spot for intimate dinners or celebratory gatherings in the heart of {restaurant.location}.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tighter">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Outdoor Seating', 'Live Music', 'Premium Bar', 'Valet Parking'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-text-muted">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>

  );
};

export default RestaurantDetailsPage;
