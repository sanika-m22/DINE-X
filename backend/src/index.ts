import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import restaurantRoutes from './routes/restaurants.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/restaurants', restaurantRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('DineX API is running with In-Memory Database...');
});

app.listen(PORT, () => {
  console.log(`DineX Server is running on port ${PORT}`);
});

export default app;

