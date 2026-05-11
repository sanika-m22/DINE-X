import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, IndianRupee, ArrowLeft, SlidersHorizontal, ChevronDown, LayoutGrid, Map as MapIcon, Bookmark } from 'lucide-react';
import { restaurants, type Restaurant } from '../data/restaurants';
import MapView from '../components/MapView';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchState = location.state as { 
    location: string; 
    budget: number; 
    selectedCuisines: string[]; 
    minRating: number; 
  } | null;

  const nearbyMapping: Record<string, string[]> = {
    'wakad': ['baner', 'hinjewadi', 'pimple saudagar'],
    'baner': ['wakad', 'aundh', 'balewadi'],
    'hinjewadi': ['wakad', 'balewadi'],
    'koregaon park': ['kalyani nagar', 'viman nagar', 'mundhwa'],
    'viman nagar': ['koregaon park', 'kalyani nagar'],
    'kalyani nagar': ['koregaon park', 'viman nagar'],
    'kothrud': ['bavdhan', 'karve nagar'],
    'bavdhan': ['kothrud', 'pashan'],
    'aundh': ['baner', 'pashan'],
  };

  const [sortBy, setSortBy] = useState<'rating' | 'budget' | 'match'>('match');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [displayData, setDisplayData] = useState<(Restaurant & { explanation: string })[]>([]);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const state = location.state as any;

    // 1. Handle Direct Keyword Search (from Navbar)
    if (state?.query) {
      const q = state.query.toLowerCase();
      const filtered = restaurants.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.cuisine.some(c => c.toLowerCase().includes(q)) ||
        r.location.toLowerCase().includes(q)
      );
      
      const results = filtered.map(r => ({
        ...r,
        explanation: `Matches your search for "${state.query}"`
      }));
      
      setDisplayData(results);
      setIsFallback(false);
      return;
    }

    // 2. Handle Preference-based Search
    if (!searchState) return;

    const calculateScore = (r: Restaurant, isExactLoc: boolean, isNearbyLoc: boolean) => {
      let score = 0;
      let reasons: string[] = [];


      // 1. Cuisine Score (40%) - Strict Requirement in this version
      const matchingCuisines = searchState.selectedCuisines.filter(c => r.cuisine.includes(c));
      if (matchingCuisines.length > 0) {
        score += 40;
        reasons.push(`matches your ${matchingCuisines[0]} craving`);
      } else if (searchState.selectedCuisines.length === 0) {
        score += 40;
      }

      // 2. Location Score (30%)
      if (isExactLoc) {
        score += 30;
        reasons.push(`in ${searchState.location}`);
      } else if (isNearbyLoc) {
        score += 15;
        reasons.push('located nearby');
      } else {
        reasons.push('located in Pune');
      }

      // 3. Budget Score (15%) - Soft
      if (r.budget <= searchState.budget) {
        score += 15;
        reasons.push('fits your budget');
      } else {
        const overPercent = (r.budget - searchState.budget) / searchState.budget;
        score += Math.max(0, 15 * (1 - overPercent));
        if (overPercent < 0.2) reasons.push('slightly over budget');
      }

      // 4. Rating Score (15%) - Soft
      const ratingWeight = (r.rating / 5) * 15;
      score += ratingWeight;
      if (r.rating >= 4.5) reasons.push('exceptional rating');

      const explanation = reasons.length > 0 
        ? reasons.join(', ').charAt(0).toUpperCase() + reasons.join(', ').slice(1) + '.'
        : 'Recommended based on your preferences.';

      return { score: Math.round(score), explanation };
    };

    const locQuery = searchState.location.toLowerCase();
    const nearby = nearbyMapping[locQuery] || [];

    // Stage 1: Filter by Cuisine (Strict)
    const cuisineMatches = restaurants.filter(r => 
      searchState.selectedCuisines.length === 0 || 
      searchState.selectedCuisines.some(c => r.cuisine.includes(c))
    );

    // Stage 2: Segment by Location
    const exactMatches = cuisineMatches.filter(r => r.location.toLowerCase().includes(locQuery));
    const nearbyMatches = cuisineMatches.filter(r => 
      !r.location.toLowerCase().includes(locQuery) && 
      nearby.some(loc => r.location.toLowerCase().includes(loc))
    );
    const otherMatches = cuisineMatches.filter(r => 
      !r.location.toLowerCase().includes(locQuery) && 
      !nearby.some(loc => r.location.toLowerCase().includes(loc))
    );

    // Stage 3: Assemble results (Strict Priority)
    let finalResults = [];
    let fallbackType: 'none' | 'nearby' | 'global' = 'none';

    if (exactMatches.length > 0) {
      finalResults = exactMatches;
      fallbackType = 'none';
      
      // If exact matches are low, augment with nearby to ensure 5-10 results
      if (finalResults.length < 5 && nearbyMatches.length > 0) {
        finalResults = [...finalResults, ...nearbyMatches];
        fallbackType = 'nearby';
      }
    } else if (nearbyMatches.length > 0) {
      finalResults = nearbyMatches;
      fallbackType = 'nearby';
    } else {
      finalResults = otherMatches;
      fallbackType = 'global';
    }

    // Calculate Match Score for all candidates
    const scoredData = finalResults.map(r => {
      const isExact = r.location.toLowerCase().includes(locQuery);
      const isNearby = nearby.some(loc => r.location.toLowerCase().includes(loc));
      const { score, explanation } = calculateScore(r, isExact, isNearby);
      return { ...r, matchScore: score, explanation };
    });

    scoredData.sort((a, b) => b.matchScore - a.matchScore);
    setDisplayData(scoredData);
    setIsFallback(fallbackType !== 'none');
    
    // Persist results for the dedicated Map tab
    localStorage.setItem('last_dinex_results', JSON.stringify(scoredData));
  }, [searchState]);









  const handleSort = (type: 'rating' | 'budget' | 'match') => {
    setSortBy(type);
    const sorted = [...displayData].sort((a, b) => {
      if (type === 'rating') return b.rating - a.rating;
      if (type === 'budget') return a.budget - b.budget;
      return b.matchScore - a.matchScore;
    });
    setDisplayData(sorted);
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={() => navigate('/preferences')}
              className="flex items-center gap-2 text-text-muted hover:text-white mb-4 transition-colors font-bold text-xs uppercase tracking-widest"
            >
              <ArrowLeft size={16} />
              Refine Search
            </button>
            <h1 className="text-4xl font-black text-white tracking-tight">
              DineX <span className="text-primary-500 italic">Recommendations</span>
            </h1>
            {isFallback && (
              <div className="mt-4 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-xl inline-flex items-center gap-2">
                <MapIcon size={14} className="text-primary-500" />
                <span className="text-primary-500 text-[10px] font-black uppercase tracking-widest">
                  No exact matches found. Showing best alternatives near you.
                </span>
              </div>
            )}
            <p className="text-text-muted mt-2 text-sm font-medium">
              {displayData.length} intelligent matches found.
            </p>
          </div>

          {/* Sorting and View Toggle */}
          <div className="flex flex-wrap items-center gap-4">
            {/* View Toggle */}
            <div className="flex p-1 bg-dark-surface border border-white/5 rounded-2xl">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  viewMode === 'list' ? 'bg-primary-500 text-white shadow-lg shadow-orange-500/20' : 'text-text-muted hover:text-text-main'
                }`}
              >
                <LayoutGrid size={16} />
                List
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  viewMode === 'map' ? 'bg-primary-500 text-white shadow-lg shadow-orange-500/20' : 'text-text-muted hover:text-text-main'
                }`}
              >
                <MapIcon size={16} />
                Map
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-2 px-6 py-3.5 bg-dark-surface border border-white/5 rounded-2xl text-sm font-bold text-text-main hover:border-white/20 transition-all shadow-sm">
                <SlidersHorizontal size={16} className="text-primary-500" />
                Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                <ChevronDown size={16} />
              </button>
              
              <div className="absolute right-0 mt-2 w-56 bg-dark-card border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                <div className="p-2">
                  <button onClick={() => handleSort('match')} className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-text-main transition-colors">Best Match</button>
                  <button onClick={() => handleSort('rating')} className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-text-main transition-colors">Rating: High to Low</button>
                  <button onClick={() => handleSort('budget')} className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-text-main transition-colors">Budget: Low to High</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Content */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {viewMode === 'list' ? (
            displayData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayData.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group bg-dark-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <div className="px-4 py-2 bg-dark-bg/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg text-white border border-white/10">
                          {restaurant.matchScore}% Match
                        </div>
                      </div>
                      <button className="absolute top-6 right-6 w-10 h-10 bg-dark-bg/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-primary-500 hover:border-primary-500 transition-all">
                        <Bookmark size={18} />
                      </button>
                      <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1 bg-primary-500 rounded-lg text-white font-black text-xs shadow-lg">
                        {restaurant.rating} <Star size={12} className="fill-current" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-white leading-tight mb-4">{restaurant.name}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {restaurant.cuisine.map(c => (
                          <span key={c} className="text-[10px] font-black uppercase tracking-widest text-text-muted px-3 py-1 bg-white/5 rounded-full">
                            {c}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto space-y-6 pt-6 border-t border-white/5">
                        <p className="text-xs text-text-muted font-medium italic mb-2">
                          "{restaurant.explanation}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-text-muted font-bold text-xs uppercase tracking-widest">
                            <MapPin size={14} className="text-primary-500" />
                            <span>{restaurant.location.split(',')[0]}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white font-black text-xl">
                            <IndianRupee size={16} />
                            <span>{restaurant.budget} <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">/ person</span></span>
                          </div>

                        </div>
                        
                        <button 
                          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                          className="w-full py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-500 hover:border-primary-500 transition-all duration-300 shadow-xl"
                        >
                          View Details
                        </button>

                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 bg-dark-surface rounded-full flex items-center justify-center mb-6 border border-white/5">
                  <MapPin size={40} className="text-text-muted opacity-20" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">No matches found</h3>
                <p className="text-text-muted max-w-md">
                  Try adjusting your filters or searching in a different area (e.g., "Pune" or "Wakad").
                </p>
                <button 
                  onClick={() => navigate('/preferences')}
                  className="mt-8 px-8 py-4 bg-primary-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Adjust Preferences
                </button>
              </div>
            )
          ) : (
            <div className="border-4 border-primary-500/10 rounded-[3rem] p-2 bg-dark-surface shadow-2xl">
              <MapView restaurants={displayData} isSearchResult={true} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;
