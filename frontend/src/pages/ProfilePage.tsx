import React, { useState } from 'react';
import { User, Settings, CreditCard, Bell, Shield, X, ChevronLeft, Moon, Globe, Plus, Lock, Eye, Share2, Clock, CheckCircle2 } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [language, setLanguage] = useState('English (UK)');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const languages = ['English (UK)', 'Hindi', 'Marathi', 'French', 'Spanish'];

  const menuItems = [
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings', color: 'text-blue-400' },
    { id: 'history', icon: <Clock size={20} />, label: 'Dining History', color: 'text-emerald-400' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications', color: 'text-orange-400' },
    { id: 'privacy', icon: <Shield size={20} />, label: 'Privacy & Security', color: 'text-purple-400' },
  ];

  const renderSubView = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <Section title="Account Settings">
              <ToggleRow icon={<User size={18} />} label="Professional Profile" defaultOn />
              <div onClick={() => setShowLanguagePicker(true)} className="cursor-pointer hover:bg-white/5 transition-colors">
                <ToggleRow 
                  icon={<Globe size={18} />} 
                  label="Language" 
                  defaultOn={false} 
                  isToggle={false} 
                  value={language} 
                />
              </div>
            </Section>
            <Section title="Preferences">
              <ToggleRow label="Auto-detect Location" defaultOn />
              <ToggleRow label="Show Gourmet Only" defaultOn={true} />
            </Section>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-6">
            {[
              { name: 'The Golden Dragon', date: 'Yesterday, 8:30 PM', price: '₹2,400', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=200' },
              { name: 'Social', date: '24 May, 1:15 PM', price: '₹1,850', image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=200' },
            ].map((visit, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-dark-surface border border-white/5 rounded-3xl group hover:bg-white/5 transition-all">
                <img src={visit.image} className="w-16 h-16 rounded-2xl object-cover" alt={visit.name} />
                <div className="flex-grow">
                  <h4 className="font-bold text-white text-sm">{visit.name}</h4>
                  <p className="text-[10px] text-text-muted">{visit.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-primary-500">{visit.price}</p>
                  <p className="text-[8px] text-emerald-500 uppercase font-black tracking-widest">Completed</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8">
            <Section title="Alert Channels">
              <ToggleRow icon={<Bell size={18} />} label="Push Notifications" defaultOn />
              <ToggleRow icon={<Globe size={18} />} label="Email Updates" defaultOn />
              <ToggleRow icon={<X size={18} />} label="SMS Alerts" defaultOn={false} />
            </Section>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-8">
            <Section title="Security">
              <ToggleRow icon={<Lock size={18} />} label="Two-Factor Auth" defaultOn />
              <ToggleRow icon={<Eye size={18} />} label="Incognito Browsing" defaultOn={false} />
            </Section>
            <Section title="Data">
              <ToggleRow icon={<Share2 size={18} />} label="Share Data with Partners" defaultOn={false} />
            </Section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-32 px-6">
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!activeTab ? (
            <motion.div 
              key="main"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-6 mb-12 bg-dark-card p-8 rounded-[2.5rem] border border-white/5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-orange-500/20">
                  JD
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">John Doe</h2>
                  <p className="text-primary-500 text-sm font-bold uppercase tracking-widest">Gourmet Member</p>
                </div>
              </div>

              <div className="space-y-4">
                {menuItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className="flex items-center justify-between p-6 bg-dark-surface border border-white/5 rounded-3xl hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-dark-bg rounded-2xl ${item.color}`}>
                        {item.icon}
                      </div>
                      <span className="font-bold text-text-main">{item.label}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted group-hover:text-white transition-colors">
                      →
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button 
                onClick={() => window.location.href = '/DineX/'}
                className="w-full mt-12 py-5 border border-red-500/20 text-red-500 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all"
              >
                Sign Out
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="sub"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <button 
                onClick={() => setActiveTab(null)}
                className="flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors font-bold text-xs uppercase tracking-widest"
              >
                <ChevronLeft size={16} />
                Back to Profile
              </button>
              
              <h2 className="text-3xl font-black text-white mb-12">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h2>
              
              {renderSubView()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Language Picker Modal */}
        <AnimatePresence>
          {showLanguagePicker && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-6"
            >
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="bg-dark-card w-full max-w-sm rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl shadow-orange-500/10"
              >
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-xl font-black text-white">Select Language</h3>
                  <button onClick={() => setShowLanguagePicker(false)} className="text-text-muted hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-4">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLanguagePicker(false);
                      }}
                      className={`w-full p-4 rounded-2xl font-bold flex items-center justify-between transition-all ${
                        language === lang ? 'bg-primary-500 text-white shadow-lg shadow-orange-500/20' : 'text-text-muted hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {lang}
                      {language === lang && <CheckCircle2 size={18} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper Components
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-2">{title}</h3>
    <div className="bg-dark-card border border-white/5 rounded-[2rem] overflow-hidden">
      {children}
    </div>
  </div>
);

const ToggleRow = ({ icon, label, defaultOn, isToggle = true, value, onToggle }: { icon?: React.ReactNode, label: string, defaultOn: boolean, isToggle?: boolean, value?: string, onToggle?: (state: boolean) => void }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-4">
        {icon && <div className="text-text-muted">{icon}</div>}
        <span className="font-bold text-sm text-text-main">{label}</span>
      </div>
      {isToggle ? (
        <button 
          onClick={() => {
            const newState = !on;
            setOn(newState);
            if (onToggle) onToggle(newState);
          }}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${on ? 'bg-primary-500' : 'bg-white/10'}`}
        >
          <motion.div 
            animate={{ x: on ? 26 : 4 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
          />
        </button>
      ) : (
        <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">{value}</span>
      )}
    </div>
  );
};


export default ProfilePage;
