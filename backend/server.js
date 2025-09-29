import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import medRoutes from './routes/medRoutes.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
const mongoDBUrl = process.env.MONGO_URL;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use('/api/medicines',medRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUrl);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error in database connection:",error);
    }
}

app.listen(port,() => {
    connectDB();
    console.log(`Server running on the port ${port}`);
})