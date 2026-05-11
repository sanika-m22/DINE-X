import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://dine-x.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
});

export interface Restaurant {
  _id?: string;
  id?: string; // for backward compatibility
  name: string;
  cuisine: string[];
  rating: number;
  budget: number;
  location: string;
  image: string;
  matchScore: number;
  lat: number;
  lng: number;
}

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await api.get('/restaurants');
  return response.data;
};

export const addRestaurant = async (restaurant: Omit<Restaurant, '_id' | 'id'>): Promise<Restaurant> => {
  const response = await api.post('/restaurants', restaurant);
  return response.data;
};

export const seedDatabase = async (initialData: any[]): Promise<void> => {
  await api.post('/restaurants/seed', initialData);
};
