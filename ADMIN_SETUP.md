# Admin User Setup Guide

## Admin Credentials
- **Email**: bteja@gmail.com
- **Password**: bhanu4430
- **Role**: admin

## Database Setup Required

The admin user creation failed because MongoDB is not running. You have two options:

### Option 1: Install and Run MongoDB Locally

1. Install MongoDB:
   ```bash
   # On macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Start MongoDB service
   brew services start mongodb/brew/mongodb-community
   ```

2. Once MongoDB is running, create the admin user:
   ```bash
   node scripts/create-admin.js
   ```

### Option 2: Use MongoDB Atlas (Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env.local` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
5. Run the admin creation script:
   ```bash
   node scripts/create-admin.js
   ```

### Option 3: Manual Database Setup

If you have access to MongoDB directly, you can manually insert the admin user:

```javascript
// Connect to your MongoDB database
use portfolio

// Insert admin user (password will be hashed by the application)
db.users.insertOne({
  email: "bteja@gmail.com",
  password: "$2a$12$hashed_password_here", // This needs to be properly hashed
  name: "Admin User",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Access URLs

Once the admin user is created:
- **Login Page**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Portfolio Site**: http://localhost:3000

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string in `.env.local` is correct
2. **Development Server**: Make sure `npm run dev` is running
3. **Environment Variables**: Verify `.env.local` file exists and contains the correct MongoDB URI

## Security Notes

- Change the default password after first login
- Use a strong `NEXTAUTH_SECRET` in production
- Never commit `.env.local` to version control
- Consider using environment-specific configurations for different deployments