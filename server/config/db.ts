import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENV } from './env';
import { db } from '../services/dataStore';
import { UserModel } from '../models/mongooseSchemas';
import { seedDatabase } from '../scripts/seed';

export async function connectDB(): Promise<void> {
  const isProd = process.env.NODE_ENV === 'production' || ENV.NODE_ENV === 'production';

  try {
    if (!ENV.MONGODB_URI) {
      if (isProd) {
        throw new Error('CRITICAL: MONGODB_URI environment variable is required in production mode. Mock/in-memory data is disabled.');
      }
      console.warn('⚠️ MONGODB_URI not provided; running in local development mode.');
      db.isMongoConnected = false;
      return;
    }

    console.log(`🔌 Connecting permanently to MongoDB: ${ENV.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}...`);

    // Setup connection listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connection established.');
      db.isMongoConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
      db.isMongoConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected.');
      db.isMongoConnected = false;
    });

    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      autoIndex: true
    });

    db.isMongoConnected = true;
    console.log('✅ MongoDB connected permanently and ready.');

    // Verify and ensure the first Super Admin user exists in MongoDB
    await ensureSuperAdminUser();

  } catch (error: any) {
    if (isProd) {
      console.error('❌ FATAL: Production MongoDB connection failed:', error.message);
      db.isMongoConnected = false;
      // In production mode, do not proceed with mock data
      throw new Error(`Fatal: MongoDB is required in production mode: ${error.message}`);
    } else {
      console.warn('⚠️ MongoDB connection could not be established at startup:', error.message);
      console.warn('ℹ️ Running in development mode. In production, real MongoDB connection is strictly enforced.');
      db.isMongoConnected = false;
    }
  }
}

async function ensureSuperAdminUser() {
  try {
    const adminEmail = (ENV.SUPER_ADMIN_EMAIL || 'admin@optionsitld.com').toLowerCase();
    const userCount = await UserModel.countDocuments();

    if (userCount === 0) {
      console.log('🌱 MongoDB database is empty. Triggering automated initial seed...');
      await seedDatabase({ wipeExisting: false, quiet: false });
      return;
    }

    const superAdmin = await UserModel.findOne({ email: adminEmail });
    if (!superAdmin) {
      console.log(`👑 Creating first Super Admin user in MongoDB: ${adminEmail}`);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ENV.SUPER_ADMIN_PASSWORD, salt);

      await UserModel.create({
        name: ENV.SUPER_ADMIN_NAME || 'Sakib',
        email: adminEmail,
        password: hashedPassword,
        role: 'super_admin',
        phone: '+8801806301888',
        companyName: 'Options IT Ltd',
        isActive: true
      });
      console.log(`✅ Super Admin user (${adminEmail}) successfully provisioned in MongoDB.`);
    } else {
      console.log(`👑 Verified existing Super Admin in MongoDB: ${superAdmin.name} <${superAdmin.email}>`);
    }
  } catch (err: any) {
    console.error('⚠️ Could not verify Super Admin in MongoDB:', err.message);
  }
}

