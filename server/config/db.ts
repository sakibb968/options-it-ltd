import mongoose from 'mongoose';
import { ENV } from './env';
import { db } from '../services/dataStore';

export async function connectDB() {
  try {
    if (!ENV.MONGODB_URI) {
      console.log('ℹ️ MONGODB_URI not provided; utilizing in-memory persistence store.');
      db.isMongoConnected = false;
      return;
    }

    // Set connection timeout to 2 seconds so server boots without delay if local mongod is not present
    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000
    });

    console.log('✅ MongoDB connected successfully to:', ENV.MONGODB_URI);
    db.isMongoConnected = true;
  } catch (error) {
    console.warn('⚠️ MongoDB connection not available at startup. Running with high-performance persistent in-memory data store.');
    db.isMongoConnected = false;
  }
}
