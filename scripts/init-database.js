/**
 * Database Initialization Script for MongoDB Compass
 * 
 * This script sets up the initial database structure, indexes, and sample data
 * for the portfolio project. It's designed to work seamlessly with MongoDB Compass.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Since we're in a Node.js script, we'll define the database config inline
const DATABASE_CONFIG = {
  name: 'portfolio',
  collections: {
    users: 'users',
    projects: 'projects',
    experiences: 'experiences',
    skills: 'skills',
    contacts: 'contacts'
  }
};

function getConnectionString() {
  return process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
}

async function checkDatabaseHealth() {
  try {
    await mongoose.connection.db.admin().ping();
    const collections = await mongoose.connection.db.listCollections().toArray();
    return {
      status: 'connected',
      database: DATABASE_CONFIG.name,
      collections: collections.map(c => c.name)
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message
    };
  }
}

// Load environment variables manually
const fs = require('fs');
const path = require('path');

// Load .env.local file
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

// Connection string
const MONGODB_URI = getConnectionString();

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Schema definitions (simplified for initialization)
const schemas = {
  User: new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isActive: { type: Boolean, default: true },
    lastLogin: Date
  }, { timestamps: true }),

  Project: new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: String,
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    imageUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  }, { timestamps: true }),

  Experience: new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    technologies: [String],
    location: String
  }, { timestamps: true }),

  Skill: new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: Number, min: 1, max: 5, default: 3 },
    description: String,
    icon: String
  }, { timestamps: true }),

  Contact: new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    ipAddress: String
  }, { timestamps: true })
};

// Create models
const models = {};
Object.keys(schemas).forEach(modelName => {
  models[modelName] = mongoose.model(modelName, schemas[modelName]);
});

/**
 * Create database indexes for optimal performance
 */
async function createIndexes() {
  log('Creating database indexes...', 'cyan');
  
  try {
    // User indexes
    await models.User.createIndexes([
      { email: 1 },
      { role: 1 },
      { isActive: 1 }
    ]);
    log('✓ User indexes created', 'green');

    // Project indexes
    await models.Project.createIndexes([
      { title: 1 },
      { technologies: 1 },
      { featured: 1 },
      { order: 1 }
    ]);
    log('✓ Project indexes created', 'green');

    // Experience indexes
    await models.Experience.createIndexes([
      { company: 1 },
      { startDate: -1 },
      { endDate: -1 },
      { current: 1 }
    ]);
    log('✓ Experience indexes created', 'green');

    // Skill indexes
    await models.Skill.createIndexes([
      { category: 1 },
      { name: 1 },
      { level: -1 }
    ]);
    log('✓ Skill indexes created', 'green');

    // Contact indexes
    await models.Contact.createIndexes([
      { email: 1 },
      { status: 1 },
      { createdAt: -1 }
    ]);
    log('✓ Contact indexes created', 'green');

  } catch (error) {
    log(`Error creating indexes: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * Create sample data for development
 */
async function createSampleData() {
  log('Creating sample data...', 'cyan');
  
  try {
    // Check if admin user already exists
    const existingAdmin = await models.User.findOne({ email: 'bteja@gmail.com' });
    
    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('bhanu4430', 12);
      const adminUser = new models.User({
        email: 'bteja@gmail.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        isActive: true
      });
      await adminUser.save();
      log('✓ Admin user created', 'green');
    } else {
      log('✓ Admin user already exists', 'yellow');
    }

    // Create sample skills if none exist
    const skillCount = await models.Skill.countDocuments();
    if (skillCount === 0) {
      const sampleSkills = [
        { name: 'JavaScript', category: 'Programming Languages', level: 5 },
        { name: 'TypeScript', category: 'Programming Languages', level: 4 },
        { name: 'React', category: 'Frontend Frameworks', level: 5 },
        { name: 'Next.js', category: 'Frontend Frameworks', level: 4 },
        { name: 'Node.js', category: 'Backend Technologies', level: 4 },
        { name: 'MongoDB', category: 'Databases', level: 4 },
        { name: 'Tailwind CSS', category: 'Styling', level: 5 }
      ];
      
      await models.Skill.insertMany(sampleSkills);
      log('✓ Sample skills created', 'green');
    } else {
      log('✓ Skills already exist', 'yellow');
    }

    // Create sample project if none exist
    const projectCount = await models.Project.countDocuments();
    if (projectCount === 0) {
      const sampleProject = {
        title: 'Portfolio Website',
        description: 'A modern portfolio website built with Next.js and MongoDB',
        longDescription: 'This portfolio website showcases my projects and skills using modern web technologies.',
        technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
        featured: true,
        order: 1
      };
      
      await models.Project.create(sampleProject);
      log('✓ Sample project created', 'green');
    } else {
      log('✓ Projects already exist', 'yellow');
    }

  } catch (error) {
    log(`Error creating sample data: ${error.message}`, 'red');
    throw error;
  }
}

/**
 * Display database information
 */
async function displayDatabaseInfo() {
  log('\n' + '='.repeat(50), 'cyan');
  log('DATABASE INFORMATION', 'bright');
  log('='.repeat(50), 'cyan');
  
  const db = mongoose.connection.db;
  const dbName = db.databaseName;
  
  log(`Database Name: ${dbName}`, 'blue');
  log(`Connection URI: ${MONGODB_URI}`, 'blue');
  
  // List collections
  const collections = await db.listCollections().toArray();
  log(`\nCollections (${collections.length}):`, 'magenta');
  
  for (const collection of collections) {
    const count = await db.collection(collection.name).countDocuments();
    log(`  • ${collection.name}: ${count} documents`, 'white');
  }
  
  // Display indexes
  log('\nIndexes:', 'magenta');
  for (const collection of collections) {
    const indexes = await db.collection(collection.name).indexes();
    log(`  • ${collection.name}: ${indexes.length} indexes`, 'white');
  }
  
  log('\n' + '='.repeat(50), 'cyan');
  log('MONGODB COMPASS CONNECTION', 'bright');
  log('='.repeat(50), 'cyan');
  log('Use this connection string in MongoDB Compass:', 'blue');
  log(MONGODB_URI, 'green');
  log('\nAdmin Credentials:', 'blue');
  log('Email: bteja@gmail.com', 'green');
  log('Password: bhanu4430', 'green');
  log('\nAccess URLs:', 'blue');
  log('Portfolio: http://localhost:3000', 'green');
  log('Admin Login: http://localhost:3000/admin/login', 'green');
  log('Admin Dashboard: http://localhost:3000/admin/dashboard', 'green');
  log('='.repeat(50), 'cyan');
}

/**
 * Main initialization function
 */
async function initializeDatabase() {
  try {
    log('Starting database initialization...', 'bright');
    log(`Connecting to: ${MONGODB_URI}`, 'blue');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    
    log('✓ Connected to MongoDB', 'green');
    
    // Create indexes
    await createIndexes();
    
    // Create sample data
    await createSampleData();
    
    // Display information
    await displayDatabaseInfo();
    
    log('\n✅ Database initialization completed successfully!', 'bright');
    
  } catch (error) {
    log(`\n❌ Database initialization failed:`, 'red');
    log(error.message, 'red');
    
    if (error.message.includes('ECONNREFUSED')) {
      log('\n💡 Troubleshooting Tips:', 'yellow');
      log('1. Make sure MongoDB is installed and running', 'white');
      log('2. Start MongoDB: brew services start mongodb/brew/mongodb-community', 'white');
      log('3. Check if port 27017 is available', 'white');
      log('4. Verify the connection string in .env.local', 'white');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    log('\n🔌 Disconnected from MongoDB', 'blue');
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase();
}

module.exports = {
  initializeDatabase,
  createIndexes,
  createSampleData,
  displayDatabaseInfo
};