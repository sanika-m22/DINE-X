import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Camera, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { addRestaurant } from '../api/api';

const AddPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: 'Fine Dining',
    image: null as string | null
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location) return;
    
    setIsSubmitting(true);
    try {
      await addRestaurant({
        name: formData.name,
        location: formData.location,
        cuisine: [formData.category],
        rating: 4.0, // Default for new
        budget: 1000, // Default
        image: formData.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        matchScore: 0,
        lat: 18.5204, // Default Pune center or nearby
        lng: 73.8567,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-primary-500" />
          </div>
          <h1 className="text-4xl font-black text-white">Submitted!</h1>
          <p className="text-text-muted font-medium max-w-xs mx-auto">
            Your recommendation for <span className="text-white font-bold">{formData.name}</span> has been added to our verification queue.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all mt-8"
          >
            Back to Home <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-32 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2">Add <span className="text-primary-500 italic">Restaurant</span></h1>
        <p className="text-text-muted mb-12 font-medium">Contribute to the DineX collection.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video bg-dark-surface border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-text-muted hover:border-primary-500/50 transition-colors cursor-pointer group relative overflow-hidden"
          >
            {formData.image ? (
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary-500/10 transition-colors">
                  <Camera size={32} className="group-hover:text-primary-500 transition-colors" />
                </div>
                <span className="font-bold text-sm uppercase tracking-widest">Upload Photo</span>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-4">Restaurant Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. The Golden Dragon" 
                className="w-full bg-dark-surface border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-text-muted focus:border-primary-500 outline-none transition-all" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-4">Location</label>
              <div className="relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Baner, Pune" 
                  className="w-full bg-dark-surface border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-text-muted focus:border-primary-500 outline-none transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-4">Category</label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['Fine Dining', 'Casual', 'Cafe', 'Bar', 'Street Food'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat})}
                    className={`px-6 py-3 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                      formData.category === cat 
                        ? 'bg-primary-500 text-white shadow-lg shadow-orange-500/20' 
                        : 'bg-dark-surface text-text-muted border border-white/5 hover:border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-primary-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all mt-8"
          >
            Submit Recommendation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;

