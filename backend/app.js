import express from 'express';
import morgan from 'morgan';
import connectDB from './db/db.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
connectDB(); // Connect to MongoDB
// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev')); // Logging middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie parser middleware

app.use('/api/users', userRoutes); // User routes

// Import routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;