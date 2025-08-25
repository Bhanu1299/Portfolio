# MongoDB Compass Setup Guide

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [Creating Database Connections](#creating-database-connections)
4. [Database and Collection Management](#database-and-collection-management)
5. [Project Integration](#project-integration)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## Overview

MongoDB Compass is the official GUI for MongoDB that provides a visual interface for exploring, querying, and managing your MongoDB databases. This guide will help you set up MongoDB Compass specifically for this portfolio project.

### What You'll Learn
- How to install MongoDB Compass
- How to connect to your portfolio database
- How to manage collections and documents
- How to troubleshoot common issues

## Installation

### Step 1: Download MongoDB Compass

#### Option A: Download from Official Website
1. Visit [MongoDB Compass Download Page](https://www.mongodb.com/products/compass)
2. Click "Download Compass"
3. Select your operating system:
   - **macOS**: Download the `.dmg` file
   - **Windows**: Download the `.exe` file
   - **Linux**: Download the `.deb` or `.rpm` file

#### Option B: Install via Package Manager (macOS)
```bash
# Using Homebrew
brew install --cask mongodb-compass
```

#### Option C: Install via Package Manager (Windows)
```powershell
# Using Chocolatey
choco install mongodb-compass

# Using Winget
winget install MongoDB.Compass
```

### Step 2: Install MongoDB Compass

#### macOS Installation
1. Open the downloaded `.dmg` file
2. Drag MongoDB Compass to your Applications folder
3. Launch MongoDB Compass from Applications
4. If prompted about security, go to System Preferences > Security & Privacy and click "Open Anyway"

#### Windows Installation
1. Run the downloaded `.exe` file
2. Follow the installation wizard
3. Choose installation directory (default is recommended)
4. Complete the installation
5. Launch MongoDB Compass from Start Menu

#### Linux Installation
```bash
# For Ubuntu/Debian (.deb)
sudo dpkg -i mongodb-compass_*.deb
sudo apt-get install -f  # Fix any dependency issues

# For Red Hat/CentOS (.rpm)
sudo rpm -i mongodb-compass-*.rpm
```

### Step 3: First Launch
1. Open MongoDB Compass
2. You'll see the connection screen
3. MongoDB Compass may ask for privacy settings - configure as needed

## Creating Database Connections

### Local MongoDB Connection

#### Prerequisites
Ensure MongoDB is installed and running locally:

```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Verify MongoDB is running
brew services list | grep mongodb
```

#### Step-by-Step Connection Setup

1. **Open MongoDB Compass**
   - Launch the application
   - You'll see the "New Connection" screen

2. **Configure Connection Settings**
   ```
   Connection String: mongodb://localhost:27017/portfolio
   ```
   
   Or use the form fields:
   - **Hostname**: `localhost`
   - **Port**: `27017`
   - **Database**: `portfolio`
   - **Authentication**: None (for local development)

3. **Test Connection**
   - Click "Connect" button
   - If successful, you'll see the database interface
   - If failed, see [Troubleshooting](#troubleshooting) section

4. **Save Connection**
   - Click "Save & Connect" to save for future use
   - Give it a name like "Portfolio Local"

### MongoDB Atlas Connection (Cloud)

If you're using MongoDB Atlas:

1. **Get Connection String from Atlas**
   - Log into MongoDB Atlas
   - Click "Connect" on your cluster
   - Choose "Connect using MongoDB Compass"
   - Copy the connection string

2. **Configure in Compass**
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio
   ```
   - Replace `<username>`, `<password>`, and `<cluster>` with your actual values

3. **Connect**
   - Paste the connection string
   - Click "Connect"

## Database and Collection Management

### Understanding the Portfolio Database Structure

This project uses the following collections:
- **users**: Admin users and authentication data
- **projects**: Portfolio projects information
- **experiences**: Work experience entries
- **skills**: Technical skills and proficiency levels
- **contacts**: Contact form submissions

### Creating the Database and Collections

#### Method 1: Through Compass GUI

1. **Create Database**
   - Click "Create Database" button
   - Database Name: `portfolio`
   - Collection Name: `users` (start with users collection)
   - Click "Create Database"

2. **Create Additional Collections**
   - In the portfolio database, click "Create Collection"
   - Add each collection: `projects`, `experiences`, `skills`, `contacts`

#### Method 2: Using the Application

The collections will be created automatically when you:
1. Start the development server: `npm run dev`
2. Use the admin panel to add data
3. The Mongoose models will create collections as needed

### Managing Documents

#### Viewing Documents
1. Navigate to a collection (e.g., `users`)
2. Click on the collection name
3. View documents in the "Documents" tab
4. Use filters to search: `{"role": "admin"}`

#### Adding Documents
1. Click "Insert Document" button
2. Choose between:
   - **JSON View**: Paste JSON directly
   - **Field-by-Field**: Use the form interface

#### Example: Adding an Admin User
```json
{
  "email": "admin@example.com",
  "password": "$2a$12$hashedPasswordHere",
  "name": "Admin User",
  "role": "admin",
  "isActive": true,
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```

#### Editing Documents
1. Click on a document to view details
2. Click the pencil icon to edit
3. Modify fields as needed
4. Click "Update" to save changes

#### Deleting Documents
1. Click on a document
2. Click the trash icon
3. Confirm deletion

### Using Indexes

View and manage indexes for better performance:
1. Go to collection
2. Click "Indexes" tab
3. View existing indexes
4. Create new indexes if needed

## Project Integration

### Environment Configuration

Ensure your `.env.local` file is properly configured:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio

# For MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# JWT Secret
JWT_SECRET=your-jwt-secret-key-change-this-in-production
```

### Database Health Check

Use the built-in health check function:

```typescript
import { checkDatabaseHealth } from './src/config/database';

// Check database status
const health = await checkDatabaseHealth();
console.log('Database Health:', health);
```

### Creating Admin User via Compass

1. **Navigate to users collection**
2. **Click "Insert Document"**
3. **Add admin user data**:
   ```json
   {
     "email": "bteja@gmail.com",
     "password": "$2a$12$hashed_password_here",
     "name": "Admin User",
     "role": "admin",
     "isActive": true
   }
   ```
4. **Hash the password** using the provided script:
   ```bash
   node scripts/create-admin.js
   ```

## Troubleshooting

### Common Connection Issues

#### Issue 1: "Connection Refused" Error
**Symptoms**: `connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
1. **Check if MongoDB is running**:
   ```bash
   # macOS
   brew services list | grep mongodb
   
   # Linux
   sudo systemctl status mongod
   
   # Windows
   net start MongoDB
   ```

2. **Start MongoDB if not running**:
   ```bash
   # macOS
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

3. **Check MongoDB port**:
   ```bash
   netstat -an | grep 27017
   ```

#### Issue 2: Authentication Failed
**Symptoms**: Authentication error when connecting

**Solutions**:
1. **For local MongoDB**: Ensure no authentication is required
2. **For Atlas**: Verify username/password in connection string
3. **Check IP whitelist** in Atlas (add 0.0.0.0/0 for development)

#### Issue 3: Database Not Found
**Symptoms**: Database doesn't appear in Compass

**Solutions**:
1. **Create database manually** in Compass
2. **Run the application** to auto-create collections
3. **Check connection string** database name

#### Issue 4: Slow Performance
**Symptoms**: Compass is slow to load data

**Solutions**:
1. **Add indexes** to frequently queried fields
2. **Limit document view** in Compass settings
3. **Use filters** to reduce data load

### Network Issues

#### Firewall Problems
1. **Check firewall settings**
2. **Allow MongoDB port 27017**
3. **For Atlas**: Ensure IP is whitelisted

#### DNS Issues
1. **Use IP address instead of hostname**
2. **Check DNS resolution**
3. **Try different network**

### Performance Optimization

#### Compass Settings
1. **Limit document display**: Set to 20-50 documents
2. **Disable real-time updates** for large collections
3. **Use sampling** for large datasets

#### Database Optimization
1. **Create appropriate indexes**
2. **Use projection** to limit fields
3. **Implement pagination** in queries

## Best Practices

### Security
1. **Never use admin credentials in production**
2. **Use environment variables** for sensitive data
3. **Enable authentication** in production MongoDB
4. **Use SSL/TLS** for remote connections
5. **Regularly rotate passwords**

### Development Workflow
1. **Use separate databases** for development/production
2. **Backup data** before major changes
3. **Test queries** in Compass before implementing
4. **Monitor performance** using Compass insights

### Data Management
1. **Follow consistent naming conventions**
2. **Validate data** before insertion
3. **Use appropriate data types**
4. **Implement proper indexing strategy**

### Backup and Recovery
1. **Regular backups** using mongodump
2. **Test restore procedures**
3. **Document backup strategy**
4. **Use Atlas automated backups** for production

## Additional Resources

### Official Documentation
- [MongoDB Compass Documentation](https://docs.mongodb.com/compass/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

### Useful Compass Features
- **Query Builder**: Visual query construction
- **Aggregation Pipeline Builder**: Visual pipeline creation
- **Schema Analysis**: Understand your data structure
- **Performance Insights**: Monitor query performance
- **Validation Rules**: Set up data validation

### Community Resources
- [MongoDB Community Forums](https://community.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Stack Overflow MongoDB Tag](https://stackoverflow.com/questions/tagged/mongodb)

---

**Need Help?**
If you encounter issues not covered in this guide:
1. Check the [Troubleshooting](#troubleshooting) section
2. Consult MongoDB official documentation
3. Search community forums
4. Check application logs for specific error messages