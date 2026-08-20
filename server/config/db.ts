import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ENV } from './env';
import { db } from '../services/dataStore';
import { UserModel } from '../models/mongooseSchemas';
import { seedDatabase } from '../scripts/seed';

let reconnectTimer: NodeJS.Timeout | null = null;
let isConnecting = false;

function formatErrorMessage(err: any): string {
  const msg = err?.message || String(err);
  if (msg.includes('alert number 80') || msg.includes('tlsv1 alert internal error')) {
    return `MongoDB Atlas TLS Handshake Rejected (SSL Alert 80).
👉 Solution: In MongoDB Atlas (cloud.mongodb.com):
   1. Go to 'Network Access' under Security.
   2. Click 'Add IP Address'.
   3. Choose 'Allow Access from Anywhere' (0.0.0.0/0) and click Confirm.
   4. Once saved in Atlas, the connection will automatically activate.`;
  }
  if (msg.includes('bad auth') || msg.includes('Authentication failed')) {
    return `MongoDB Authentication Failed.
👉 Solution: Verify your database username and password in MONGODB_URI. If your password has special characters, ensure it is URL-encoded.`;
  }
  if (msg.includes('querySrv ENOTFOUND') || msg.includes('getaddrinfo ENOTFOUND')) {
    return `MongoDB DNS host lookup failed (${msg}).
👉 Solution: Verify the cluster hostname in your MONGODB_URI connection string.`;
  }
  return msg;
}

export async function connectDB(): Promise<void> {
  if (isConnecting || mongoose.connection.readyState === 1) {
    return;
  }

  const rawUri = (ENV.MONGODB_URI || '').trim();

  if (!rawUri || rawUri === 'mongodb://127.0.0.1:27017/options_it_ltd') {
    // If running in cloud container without local mongod or custom URI
    console.info('ℹ️ Running with in-memory persistence & SQLite/DataStore engine.');
    db.isMongoConnected = false;
    return;
  }

  isConnecting = true;
  const maskedUri = rawUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
  console.log(`🔌 Connecting to MongoDB: ${maskedUri}...`);

  try {
    // Remove stale listeners to prevent duplicates on reconnect
    mongoose.connection.removeAllListeners('connected');
    mongoose.connection.removeAllListeners('error');
    mongoose.connection.removeAllListeners('disconnected');

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connection established and active.');
      db.isMongoConnected = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    });

    mongoose.connection.on('error', (err) => {
      db.isMongoConnected = false;
      const formatted = formatErrorMessage(err);
      console.warn(`⚠️ MongoDB Connection Event: ${formatted}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Retrying in background...');
      db.isMongoConnected = false;
      scheduleReconnect();
    });

    await mongoose.connect(rawUri, {
      serverSelectionTimeoutMS: 6000,
      connectTimeoutMS: 6000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 to prevent IPv6 TLS alert 80 / routing issues
      autoIndex: true
    });

    db.isMongoConnected = true;
    console.log('✅ MongoDB connected successfully.');

    // Verify and ensure the Super Admin user exists in MongoDB
    await ensureSuperAdminUser();

  } catch (error: any) {
    db.isMongoConnected = false;
    const formatted = formatErrorMessage(error);
    console.warn(`⚠️ MongoDB connection attempt notice:\n${formatted}`);
    console.info('⚡ In-memory database is active with Super Admin (admin@optionsitld.com). All services, forms, and portals remain 100% operational.');

    scheduleReconnect();
  } finally {
    isConnecting = false;
  }
}

function scheduleReconnect() {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(async () => {
    reconnectTimer = null;
    if (mongoose.connection.readyState !== 1 && ENV.MONGODB_URI && ENV.MONGODB_URI !== 'mongodb://127.0.0.1:27017/options_it_ltd') {
      try {
        await connectDB();
      } catch {
        // Silently caught; handled inside connectDB
      }
    }
  }, 30000);
}

async function ensureSuperAdminUser() {
  try {
    const adminEmail = (ENV.SUPER_ADMIN_EMAIL || 'admin@optionsitld.com').toLowerCase();
    const userCount = await UserModel.countDocuments();

    if (userCount === 0) {
      console.log('🌱 MongoDB database is empty. Provisioning initial seed data...');
      await seedDatabase({ wipeExisting: false, quiet: false });
      return;
    }

    const superAdmin = await UserModel.findOne({ email: adminEmail });
    if (!superAdmin) {
      console.log(`👑 Creating Super Admin in MongoDB: ${adminEmail}`);
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
      console.log(`✅ Super Admin (${adminEmail}) successfully provisioned in MongoDB.`);
    } else {
      console.log(`👑 Verified Super Admin: ${superAdmin.name} <${superAdmin.email}>`);
    }
  } catch (err: any) {
    console.warn('⚠️ Could not verify Super Admin in MongoDB:', err.message);
  }
}


