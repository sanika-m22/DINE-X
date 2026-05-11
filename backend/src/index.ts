import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import restaurantRoutes from './routes/restaurants.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Port 5001 to avoid conflict with SmartSplit server

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/restaurants', restaurantRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('DineX API is running...');
});

// Database Connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log('No MONGO_URI found, starting MongoDB Memory Server...');
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB: ${mongoUri.includes('127.0.0.1') ? 'Memory Server' : 'Remote DB'}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Don't exit process in serverless
    if (process.env.NODE_ENV !== 'production') process.exit(1);
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`DineX Server is running on port ${PORT}`);
    });
  });
} else {
  // In Vercel, we just need to ensure DB is connected
  app.use(async (req, res, next) => {
    await connectDB();
    next();
  });
}

export default app;
