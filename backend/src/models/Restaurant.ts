import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: [String], required: true },
  rating: { type: Number, required: true },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  matchScore: { type: Number, default: 0 },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
}, { timestamps: true });

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
