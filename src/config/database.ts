/**
 * Database Configuration for MongoDB Compass Integration
 * 
 * This file contains database configuration settings optimized for
 * MongoDB Compass connectivity and management.
 */

export const DATABASE_CONFIG = {
  // Database name
  DATABASE_NAME: 'portfolio',
  
  // Collection names
  COLLECTIONS: {
    USERS: 'users',
    PROJECTS: 'projects',
    EXPERIENCES: 'experiences',
    SKILLS: 'skills',
    CONTACTS: 'contacts'
  },
  
  // Connection settings for MongoDB Compass
  CONNECTION_OPTIONS: {
    // Connection timeout settings
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    
    // Pool settings
    maxPoolSize: 10,
    minPoolSize: 2,
    
    // Retry settings
    retryWrites: true,
    retryReads: true,
    
    // Network settings
    family: 4, // Use IPv4
    
    // Buffer settings
    bufferCommands: false,
    bufferMaxEntries: 0
  },
  
  // MongoDB Compass connection strings for different environments
  CONNECTION_STRINGS: {
    LOCAL: 'mongodb://localhost:27017/portfolio',
    ATLAS: 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority',
    DOCKER: 'mongodb://mongodb:27017/portfolio'
  },
  
  // Database indexes for optimal performance
  INDEXES: {
    USERS: [
      { email: 1 }, // Unique index on email
      { role: 1 },
      { isActive: 1 }
    ],
    PROJECTS: [
      { title: 1 },
      { technologies: 1 },
      { featured: 1 }
    ],
    EXPERIENCES: [
      { company: 1 },
      { startDate: -1 }, // Descending order for recent first
      { endDate: -1 }
    ],
    SKILLS: [
      { category: 1 },
      { name: 1 },
      { level: -1 }
    ],
    CONTACTS: [
      { email: 1 },
      { createdAt: -1 }
    ]
  }
};

/**
 * Get MongoDB connection string based on environment
 */
export function getConnectionString(environment: 'local' | 'atlas' | 'docker' = 'local'): string {
  const envVar = process.env.MONGODB_URI;
  
  if (envVar) {
    return envVar;
  }
  
  switch (environment) {
    case 'atlas':
      return DATABASE_CONFIG.CONNECTION_STRINGS.ATLAS;
    case 'docker':
      return DATABASE_CONFIG.CONNECTION_STRINGS.DOCKER;
    case 'local':
    default:
      return DATABASE_CONFIG.CONNECTION_STRINGS.LOCAL;
  }
}

/**
 * Database health check function
 */
export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  database: string;
  collections: string[];
  error?: string;
}> {
  try {
    const mongoose = require('mongoose');
    
    if (mongoose.connection.readyState !== 1) {
      return {
        connected: false,
        database: '',
        collections: [],
        error: 'Database not connected'
      };
    }
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    return {
      connected: true,
      database: db.databaseName,
      collections: collections.map((col: any) => col.name)
    };
  } catch (error) {
    return {
      connected: false,
      database: '',
      collections: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export default DATABASE_CONFIG;