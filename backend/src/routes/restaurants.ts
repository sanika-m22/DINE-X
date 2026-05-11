import express from 'express';

const router = express.Router();

// In-memory data store
let restaurants = [
  {
    id: '1',
    name: 'Saffron Leaf',
    cuisine: ['Indian', 'Fine Dining'],
    rating: 4.8,
    budget: 1500,
    location: 'Koregaon Park, Pune',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    matchScore: 98,
    lat: 18.5362,
    lng: 73.8940,
  },
  {
    id: '2',
    name: 'Golden Dragon',
    cuisine: ['Chinese'],
    rating: 4.5,
    budget: 1200,
    location: 'Viman Nagar, Pune',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
    matchScore: 92,
    lat: 18.5679,
    lng: 73.9143,
  }
];

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error });
  }
});

// Add a new restaurant
router.post('/', async (req, res) => {
  try {
    const newRestaurant = { ...req.body, id: Date.now().toString() };
    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: 'Error creating restaurant', error });
  }
});

// Seed restaurants
router.post('/seed', async (req, res) => {
  try {
    if (restaurants.length > 2) {
      return res.status(400).json({ message: 'Database already seeded' });
    }
    
    const initialData = req.body; 
    restaurants = [...restaurants, ...initialData];
    res.status(201).json({ message: 'Seeded successfully', count: initialData.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error });
  }
});

export default router;

