import express from 'express';
import { Restaurant } from '../models/Restaurant.js';

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
});

// Add a new restaurant
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: 'Error creating restaurant', error });
  }
});

// Seed restaurants (one-time use for demo)
router.post('/seed', async (req, res) => {
  try {
    const count = await Restaurant.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: 'Database already seeded' });
    }
    
    const initialData = req.body; // Expecting the array from frontend data/restaurants.ts
    const created = await Restaurant.insertMany(initialData);
    res.status(201).json({ message: 'Seeded successfully', count: created.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error });
  }
});

export default router;
