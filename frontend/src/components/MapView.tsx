import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Star, IndianRupee } from 'lucide-react';
import { type Restaurant } from '../data/restaurants';

// Fix for default marker icons in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Premium/Highlighted Icon
const HighlightedIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #f97316; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const NormalIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #6b7280; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

interface MapViewProps {
  restaurants: Restaurant[];
  isSearchResult?: boolean;
}

const MapView: React.FC<MapViewProps> = ({ restaurants, isSearchResult = false }) => {
  const center: [number, number] = [18.5204, 73.8567]; // Pune Center

  return (
    <div className="h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-primary-500/20 z-10 shadow-primary-500/10">
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restaurants.map((restaurant) => (
          <Marker 
            key={restaurant.id} 
            position={[restaurant.lat, restaurant.lng]}
            icon={isSearchResult || restaurant.matchScore >= 90 ? HighlightedIcon : NormalIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{restaurant.name}</h3>
                <div className="flex items-center gap-1.5 text-sm mb-2">
                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    {restaurant.rating} <Star size={14} className="fill-current" />
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <IndianRupee size={12} />
                    {restaurant.budget}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.cuisine.slice(0, 2).map(c => (
                    <span key={c} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-medium">
                      {c}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => alert(`Opening menu for ${restaurant.name}...`)}
                  className="w-full py-2 bg-primary-500 text-white rounded-xl text-xs font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  View Menu
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
