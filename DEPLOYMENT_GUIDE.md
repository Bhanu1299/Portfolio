# Portfolio Application Deployment Guide

This guide will help you deploy your portfolio application to production with a dedicated URL and automatic admin portal updates.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (for production database)
- Vercel or Netlify account
- Domain name (optional, but recommended)

### 1. Environment Setup

#### Production Environment Variables
Copy `.env.production` and update with your actual values:

```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Your production domain
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secure-secret-key-minimum-32-characters

# JWT Secret for admin authentication
JWT_SECRET=your-jwt-secret-key-minimum-32-characters

# Admin Portal Configuration
ADMIN_PORT=3001
ADMIN_BASE_URL=https://admin.your-domain.com
```

### 2. Database Setup

#### MongoDB Atlas Setup
1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get your connection string and update `MONGODB_URI`

#### Initialize Database
```bash
# Set production environment variables first
export MONGODB_URI="your-atlas-connection-string"

# Initialize database with sample data
npm run db:init

# Create admin user
npm run db:create-admin
```

### 3. Build and Test Locally

```bash
# Install dependencies
npm install

# Run type checking and linting
npm run type-check
npm run lint

# Build for production
npm run build:production

# Test production build locally
npm run start:production
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Setup
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`

#### Environment Variables in Vercel
Set these in your Vercel dashboard:
- `MONGODB_URI`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `NODE_ENV=production`

#### Deploy
```bash
# Deploy to production
npm run deploy:vercel

# Or use the deployment script
node scripts/deploy.js vercel
```

#### Custom Domain Setup
1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Option 2: Netlify

#### Setup
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Login: `netlify login`
3. Link project: `netlify link`

#### Environment Variables in Netlify
Set these in your Netlify dashboard:
- `MONGODB_URI`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `NODE_ENV=production`

#### Deploy
```bash
# Deploy to production
npm run deploy:netlify

# Or use the deployment script
node scripts/deploy.js netlify
```

## 🔄 Automatic Updates with CI/CD

### GitHub Actions Setup

1. **Repository Secrets**: Add these to your GitHub repository secrets:
   - `MONGODB_URI`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `JWT_SECRET`
   - `VERCEL_TOKEN` (from Vercel dashboard)
   - `VERCEL_ORG_ID` (from Vercel dashboard)
   - `VERCEL_PROJECT_ID` (from Vercel dashboard)

2. **Automatic Deployment**: The GitHub Actions workflow will:
   - Run tests and linting on every push
   - Deploy to staging on `develop` branch
   - Deploy to production on `main`/`master` branch

### Manual Deployment Script

```bash
# Deploy to Vercel
node scripts/deploy.js vercel

# Deploy to Netlify
node scripts/deploy.js netlify
```

## 🔧 Admin Portal Configuration

### Separate Admin Environment

The admin portal runs on the same application but can be configured with different settings:

1. **Environment Variables**:
   ```bash
   ADMIN_PORT=3001
   ADMIN_BASE_URL=https://admin.your-domain.com
   ```

2. **Subdomain Setup**:
   - Main site: `https://your-domain.com`
   - Admin portal: `https://admin.your-domain.com`

3. **DNS Configuration**:
   ```
   A     your-domain.com        → Vercel IP
   CNAME admin.your-domain.com  → your-domain.com
   ```

### Admin Portal Features
- Automatic updates when you push to main branch
- Secure authentication with JWT
- Real-time content management
- User management system
- Analytics and monitoring

## 📊 Monitoring and Analytics

### Performance Monitoring
- Vercel Analytics (built-in)
- Google Analytics (configure in admin)
- Core Web Vitals monitoring

### Error Tracking
- Vercel Error Tracking
- Custom error logging in admin portal

### Database Monitoring
- MongoDB Atlas monitoring dashboard
- Connection pool monitoring
- Query performance insights

## 🔒 Security Considerations

### Production Security Checklist
- ✅ Strong, unique secrets for all environment variables
- ✅ HTTPS enforced (automatic with Vercel/Netlify)
- ✅ Security headers configured in `next.config.js`
- ✅ Database connection secured with MongoDB Atlas
- ✅ Admin routes protected with authentication
- ✅ Input validation on all forms
- ✅ Rate limiting on API endpoints

### Environment Security
- Never commit `.env` files to version control
- Use different secrets for staging and production
- Regularly rotate secrets and passwords
- Monitor access logs and unusual activity

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check for TypeScript errors
   npm run type-check
   
   # Fix linting issues
   npm run lint:fix
   ```

2. **Database Connection Issues**:
   ```bash
   # Test database connection
   npm run db:health
   ```

3. **Environment Variable Issues**:
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure secrets are properly encoded

4. **Admin Portal Access Issues**:
   - Verify admin user exists: `npm run db:create-admin`
   - Check JWT secret configuration
   - Verify admin routes are accessible

### Support

If you encounter issues:
1. Check the deployment logs in your hosting platform
2. Review the troubleshooting guide: `TROUBLESHOOTING_GUIDE.md`
3. Test locally with production environment variables
4. Check database connectivity and permissions

## 🎉 Post-Deployment Checklist

- [ ] Application loads correctly at your domain
- [ ] Admin portal is accessible and functional
- [ ] Database operations work (create, read, update, delete)
- [ ] Contact form submissions work
- [ ] All admin routes are protected
- [ ] SSL certificate is active
- [ ] Custom domain is configured
- [ ] Analytics are tracking
- [ ] Error monitoring is active
- [ ] Backup strategy is in place

---

**Your portfolio is now live and ready for the world! 🌟**

Main Application: `https://your-domain.com`  
Admin Portal: `https://admin.your-domain.com`