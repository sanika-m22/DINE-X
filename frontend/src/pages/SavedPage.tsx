import React from 'react';
import { Bookmark, MapPin } from 'lucide-react';

const SavedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 bg-dark-surface border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Bookmark size={32} className="text-primary-500" />
        </div>
        <h1 className="text-4xl font-black text-white mb-4">Your <span className="text-primary-500 italic">Favorites</span></h1>
        <p className="text-text-muted mb-12 font-medium max-w-md mx-auto">You haven't saved any restaurants yet. Start exploring to build your culinary collection.</p>
        
        <button className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary-500 hover:border-primary-500 transition-all">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default SavedPage;
