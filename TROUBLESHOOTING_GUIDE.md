# MongoDB Compass Troubleshooting Guide

## Common Issues and Solutions

### 🔴 Connection Issues

#### Issue 1: "Connection Refused" Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Root Cause**: MongoDB server is not running

**Solutions**:

1. **Check MongoDB Status**
   ```bash
   # macOS (Homebrew)
   brew services list | grep mongodb
   
   # Linux (systemd)
   sudo systemctl status mongod
   
   # Windows (Services)
   sc query MongoDB
   ```

2. **Start MongoDB Service**
   ```bash
   # macOS (Homebrew)
   brew services start mongodb/brew/mongodb-community
   
   # Linux (systemd)
   sudo systemctl start mongod
   
   # Windows (Command Prompt as Admin)
   net start MongoDB
   ```

3. **Verify Port Availability**
   ```bash
   # Check if port 27017 is in use
   netstat -an | grep 27017
   lsof -i :27017  # macOS/Linux
   ```

4. **Manual MongoDB Start** (if service fails)
   ```bash
   # Start MongoDB manually
   mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
   ```

#### Issue 2: "Authentication Failed" Error
```
Error: Authentication failed
```

**Solutions**:

1. **For Local Development** (No Auth Required)
   - Use connection string: `mongodb://localhost:27017/portfolio`
   - Ensure MongoDB is running without `--auth` flag

2. **For MongoDB Atlas**
   - Verify username and password in connection string
   - Check IP whitelist (add `0.0.0.0/0` for development)
   - Ensure database user has proper permissions

3. **Reset Local MongoDB** (if auth is accidentally enabled)
   ```bash
   # Stop MongoDB
   brew services stop mongodb/brew/mongodb-community
   
   # Start without auth
   mongod --dbpath /usr/local/var/mongodb --noauth
   ```

#### Issue 3: "Server Selection Timeout" Error
```
Error: Server selection timed out after 30000 ms
```

**Solutions**:

1. **Check Network Connectivity**
   ```bash
   # Test connection to MongoDB port
   telnet localhost 27017
   nc -zv localhost 27017
   ```

2. **Firewall Issues**
   - Allow port 27017 through firewall
   - Disable firewall temporarily for testing
   
3. **DNS Resolution**
   - Use IP address instead of hostname
   - Try `127.0.0.1` instead of `localhost`

### 🔴 Database Issues

#### Issue 4: Database Not Found
```
Database 'portfolio' not found in MongoDB Compass
```

**Solutions**:

1. **Initialize Database**
   ```bash
   npm run db:init
   ```

2. **Create Database Manually in Compass**
   - Click "Create Database"
   - Database Name: `portfolio`
   - Collection Name: `users`
   - Click "Create Database"

3. **Start Application** (auto-creates database)
   ```bash
   npm run dev
   # Navigate to admin panel and add data
   ```

#### Issue 5: Collections Not Visible
```
Collections don't appear in MongoDB Compass
```

**Solutions**:

1. **Refresh Connection**
   - Click refresh button in Compass
   - Reconnect to database

2. **Check Collection Names**
   - Ensure collections exist: `users`, `projects`, `experiences`, `skills`, `contacts`
   - Run initialization script: `npm run db:init`

3. **Verify Database Selection**
   - Ensure you're viewing the `portfolio` database
   - Check database dropdown in Compass

### 🔴 Application Issues

#### Issue 6: Admin User Cannot Login
```
Invalid credentials error in admin panel
```

**Solutions**:

1. **Verify Admin User Exists**
   ```bash
   # Check database health
   npm run db:health
   ```

2. **Create Admin User**
   ```bash
   # Method 1: Direct database
   npm run db:create-admin
   
   # Method 2: Via API (requires dev server running)
   npm run db:create-admin-api
   ```

3. **Check User in Compass**
   - Navigate to `users` collection
   - Filter: `{"role": "admin"}`
   - Verify user exists with correct email

4. **Password Issues**
   - Ensure password is properly hashed
   - Default credentials: `bteja@gmail.com` / `bhanu4430`

#### Issue 7: Development Server Won't Start
```
Error: Cannot find module or connection errors
```

**Solutions**:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Check Environment Variables**
   ```bash
   # Verify .env.local exists and contains:
   cat .env.local
   ```
   
   Required variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
   JWT_SECRET=your-jwt-secret-key-change-this-in-production
   ```

3. **Clear Next.js Cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

### 🔴 Performance Issues

#### Issue 8: Slow MongoDB Compass Performance
```
Compass is slow to load or display data
```

**Solutions**:

1. **Limit Document Display**
   - In Compass settings, set document limit to 20-50
   - Use filters to reduce data load

2. **Disable Real-time Updates**
   - Turn off auto-refresh in Compass
   - Manually refresh when needed

3. **Use Sampling**
   - Enable sampling for large collections
   - Adjust sample size in Compass settings

4. **Add Indexes**
   ```bash
   # Run initialization to create indexes
   npm run db:init
   ```

### 🔴 Data Issues

#### Issue 9: Data Not Syncing Between App and Compass
```
Changes in app don't appear in Compass or vice versa
```

**Solutions**:

1. **Refresh Compass**
   - Click refresh button
   - Reconnect to database

2. **Check Connection String**
   - Ensure both app and Compass use same database
   - Verify database name in connection string

3. **Clear Application Cache**
   ```bash
   # Restart development server
   # Clear browser cache
   # Check for cached connections
   ```

#### Issue 10: Corrupted Data or Schema Issues
```
Data appears corrupted or schema validation errors
```

**Solutions**:

1. **Validate Data**
   - Use Compass schema analysis
   - Check for data type inconsistencies

2. **Recreate Collections**
   ```bash
   # Backup data first
   mongodump --db portfolio --out ./backup
   
   # Drop and recreate
   npm run db:init
   ```

3. **Fix Schema Issues**
   - Update Mongoose models
   - Run data migration scripts

## Visual Troubleshooting Guide

### Connection Flow Diagram
```
[Application] ←→ [MongoDB Driver] ←→ [MongoDB Server] ←→ [MongoDB Compass]
     ↓                    ↓                 ↓                    ↓
[.env.local]      [Connection Pool]    [Port 27017]        [GUI Interface]
```

### Troubleshooting Checklist

#### ✅ Pre-Connection Checklist
- [ ] MongoDB is installed
- [ ] MongoDB service is running
- [ ] Port 27017 is available
- [ ] `.env.local` file exists
- [ ] Connection string is correct
- [ ] No firewall blocking connection

#### ✅ Post-Connection Checklist
- [ ] Database `portfolio` exists
- [ ] Collections are visible
- [ ] Admin user exists
- [ ] Indexes are created
- [ ] Sample data is present
- [ ] Application can connect

### Common Error Patterns

| Error Message | Likely Cause | Quick Fix |
|---------------|--------------|----------|
| `ECONNREFUSED` | MongoDB not running | `brew services start mongodb/brew/mongodb-community` |
| `Authentication failed` | Wrong credentials | Check connection string |
| `Server selection timeout` | Network/firewall issue | Check port 27017 |
| `Database not found` | Database doesn't exist | Run `npm run db:init` |
| `Collection not found` | Collection doesn't exist | Use admin panel to create data |
| `Invalid credentials` | Admin user missing | Run `npm run db:create-admin` |

## Advanced Troubleshooting

### Debug Mode

1. **Enable MongoDB Logging**
   ```bash
   # Start MongoDB with verbose logging
   mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --verbose
   ```

2. **Enable Application Debug**
   ```bash
   # Add to .env.local
   DEBUG=mongoose:*
   NODE_ENV=development
   ```

3. **Compass Debug Mode**
   - Help → Toggle Developer Tools
   - Check console for errors
   - Monitor network requests

### Network Diagnostics

```bash
# Test MongoDB connectivity
telnet localhost 27017

# Check listening ports
netstat -tulpn | grep 27017

# Test DNS resolution
nslookup localhost
ping localhost

# Check firewall status
sudo ufw status  # Linux
sudo pfctl -s all  # macOS
```

### Database Diagnostics

```javascript
// MongoDB shell commands
use portfolio
db.runCommand({ping: 1})  // Test connection
db.stats()  // Database statistics
db.serverStatus()  // Server status
show collections  // List collections
db.users.find().count()  // Count documents
```

## Recovery Procedures

### Complete Reset

If all else fails, perform a complete reset:

```bash
# 1. Stop all services
brew services stop mongodb/brew/mongodb-community

# 2. Backup existing data (optional)
mongodump --db portfolio --out ./backup-$(date +%Y%m%d)

# 3. Remove database files
rm -rf /usr/local/var/mongodb/*

# 4. Restart MongoDB
brew services start mongodb/brew/mongodb-community

# 5. Initialize fresh database
npm run db:init

# 6. Start application
npm run dev
```

### Partial Recovery

To recover specific collections:

```bash
# Export specific collection
mongodump --db portfolio --collection users --out ./backup

# Drop collection
mongo portfolio --eval "db.users.drop()"

# Restore collection
mongorestore --db portfolio --collection users ./backup/portfolio/users.bson
```

## Getting Help

### Log Collection

When seeking help, collect these logs:

1. **MongoDB Logs**
   ```bash
   tail -f /usr/local/var/log/mongodb/mongo.log
   ```

2. **Application Logs**
   ```bash
   # Development server output
   npm run dev 2>&1 | tee app.log
   ```

3. **System Information**
   ```bash
   # Operating system
   uname -a
   
   # MongoDB version
   mongod --version
   
   # Node.js version
   node --version
   
   # npm version
   npm --version
   ```

### Support Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **MongoDB Compass Documentation**: https://docs.mongodb.com/compass/
- **MongoDB Community Forums**: https://community.mongodb.com/
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/mongodb
- **GitHub Issues**: Check project repository for known issues

### Creating Bug Reports

Include this information when reporting issues:

1. **Environment Details**
   - Operating system and version
   - MongoDB version
   - Node.js version
   - Application version

2. **Error Information**
   - Complete error message
   - Stack trace
   - Steps to reproduce
   - Expected vs actual behavior

3. **Configuration**
   - Connection string (sanitized)
   - Environment variables (sanitized)
   - Relevant configuration files

4. **Logs**
   - MongoDB logs
   - Application logs
   - Browser console errors (if applicable)

---

**Remember**: Most MongoDB connection issues are related to the service not running or incorrect connection strings. Always start with the basics before diving into complex troubleshooting.