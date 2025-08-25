# Database Quick Reference Guide

## Quick Start Commands

```bash
# 1. Initialize database with sample data and indexes
npm run db:init

# 2. Check database connection and health
npm run db:health

# 3. Create admin user (if needed)
npm run db:create-admin

# 4. Start development server
npm run dev

# Alternative: Create admin via API (requires dev server running)
npm run db:create-admin-api
```

### ✅ Verification Steps

After running the commands above, verify everything is working:

1. **Database Health**: `npm run db:health` should show:
   - ✅ Connected to MongoDB
   - 📁 Collections: users, projects, experiences, skills, contacts
   - 👤 Admin user found

2. **MongoDB Compass**: Connect using `mongodb://localhost:27017/portfolio`

3. **Web Access**: 
   - Portfolio: http://localhost:3000
   - Admin Login: http://localhost:3000/admin/login (bteja@gmail.com / bhanu4430)

## MongoDB Compass Connection

### Local Connection String
```
mongodb://localhost:27017/portfolio
```

### Connection Steps
1. Open MongoDB Compass
2. Paste connection string: `mongodb://localhost:27017/portfolio`
3. Click "Connect"
4. Navigate to `portfolio` database

## Database Collections

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `users` | Admin authentication | email, password, role, isActive |
| `projects` | Portfolio projects | title, description, technologies, featured |
| `experiences` | Work experience | company, position, startDate, endDate |
| `skills` | Technical skills | name, category, level |
| `contacts` | Contact form submissions | name, email, message, status |

## Common Operations

### View All Collections
```javascript
// In MongoDB Compass or MongoDB shell
show collections
```

### Find Admin Users
```javascript
// In MongoDB Compass query bar
{"role": "admin"}
```

### Find Featured Projects
```javascript
// In MongoDB Compass query bar
{"featured": true}
```

### Find Current Experiences
```javascript
// In MongoDB Compass query bar
{"current": true}
```

## Admin Credentials

**Default Admin User:**
- Email: `bteja@gmail.com`
- Password: `bhanu4430`
- Role: `admin`

## Access URLs

- **Portfolio Site**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## Troubleshooting

### MongoDB Not Running
```bash
# Start MongoDB (macOS)
brew services start mongodb/brew/mongodb-community

# Check if running
brew services list | grep mongodb
```

### Connection Refused Error
1. Ensure MongoDB is installed and running
2. Check port 27017 is available
3. Verify `.env.local` has correct MONGODB_URI

### Database Not Found
1. Run initialization script: `node scripts/init-database.js`
2. Start development server: `npm run dev`
3. Use admin panel to create data

## Environment Variables

Ensure `.env.local` contains:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
JWT_SECRET=your-jwt-secret-key-change-this-in-production
```

## Database Schema Examples

### User Document
```json
{
  "_id": "ObjectId",
  "email": "bteja@gmail.com",
  "password": "$2a$12$hashedPassword...",
  "name": "Admin User",
  "role": "admin",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Project Document
```json
{
  "_id": "ObjectId",
  "title": "Portfolio Website",
  "description": "A modern portfolio website",
  "technologies": ["Next.js", "MongoDB", "TypeScript"],
  "githubUrl": "https://github.com/user/repo",
  "liveUrl": "https://example.com",
  "featured": true,
  "order": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Experience Document
```json
{
  "_id": "ObjectId",
  "company": "Tech Company",
  "position": "Full Stack Developer",
  "description": "Developed web applications...",
  "startDate": "2023-01-01T00:00:00.000Z",
  "endDate": "2024-01-01T00:00:00.000Z",
  "current": false,
  "technologies": ["React", "Node.js", "MongoDB"],
  "location": "Remote",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Skill Document
```json
{
  "_id": "ObjectId",
  "name": "JavaScript",
  "category": "Programming Languages",
  "level": 5,
  "description": "Advanced JavaScript development",
  "icon": "javascript-icon",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Contact Document
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project...",
  "status": "new",
  "ipAddress": "192.168.1.1",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Useful MongoDB Compass Features

### Query Builder
- Use the visual query builder for complex queries
- Filter documents by any field
- Sort results by date, name, or other fields

### Aggregation Pipeline
- Build complex data transformations
- Group and analyze data
- Create reports and statistics

### Schema Analysis
- View field types and distributions
- Identify data inconsistencies
- Understand collection structure

### Performance Insights
- Monitor query performance
- Identify slow operations
- Optimize database usage

## Backup and Restore

### Export Data
```bash
# Export entire database
mongodump --db portfolio --out ./backup

# Export specific collection
mongodump --db portfolio --collection users --out ./backup
```

### Import Data
```bash
# Restore entire database
mongorestore --db portfolio ./backup/portfolio

# Restore specific collection
mongorestore --db portfolio --collection users ./backup/portfolio/users.bson
```

### JSON Export (via Compass)
1. Select collection in Compass
2. Click "Export Collection"
3. Choose JSON format
4. Select fields to export
5. Save to file

## Security Best Practices

1. **Change default passwords** in production
2. **Use environment variables** for sensitive data
3. **Enable authentication** for production MongoDB
4. **Use SSL/TLS** for remote connections
5. **Regularly backup** your data
6. **Monitor access logs** for suspicious activity

---

**For detailed setup instructions, see:** [MONGODB_COMPASS_GUIDE.md](./MONGODB_COMPASS_GUIDE.md)