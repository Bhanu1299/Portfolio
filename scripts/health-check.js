#!/usr/bin/env node

// Simple database health check script
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables manually
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const envLines = envFile.split('\n');
  
  envLines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        process.env[key] = value;
      }
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

async function checkDatabaseHealth() {
  try {
    console.log('🔍 Checking database connection...');
    console.log(`📍 Connection URI: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Ping the database
    await mongoose.connection.db.admin().ping();
    console.log('✅ Database ping successful');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📊 Database: portfolio`);
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('\nCollections:');
      for (const collection of collections) {
        const count = await mongoose.connection.db.collection(collection.name).countDocuments();
        console.log(`  • ${collection.name}: ${count} documents`);
      }
    } else {
      console.log('⚠️  No collections found. Run `npm run db:init` to initialize the database.');
    }
    
    // Check for admin user
    const adminUser = await mongoose.connection.db.collection('users').findOne({ role: 'admin' });
    if (adminUser) {
      console.log('\n👤 Admin user found:');
      console.log(`  • Email: ${adminUser.email}`);
      console.log(`  • Role: ${adminUser.role}`);
    } else {
      console.log('\n⚠️  No admin user found. Run `npm run db:create-admin` to create one.');
    }
    
    console.log('\n🌐 Access URLs:');
    console.log('  • Portfolio: http://localhost:3000');
    console.log('  • Admin Login: http://localhost:3000/admin/login');
    console.log('  • Admin Dashboard: http://localhost:3000/admin/dashboard');
    
    console.log('\n✅ Database health check completed successfully!');
    
  } catch (error) {
    console.error('❌ Database health check failed:');
    console.error(`Error: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('  1. Make sure MongoDB is running:');
      console.log('     • macOS: brew services start mongodb/brew/mongodb-community');
      console.log('     • Linux: sudo systemctl start mongod');
      console.log('     • Windows: net start MongoDB');
      console.log('  2. Check if port 27017 is available');
      console.log('  3. Verify MongoDB installation');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the health check
checkDatabaseHealth().catch(console.error);