#!/usr/bin/env node
/**
 * Deployment Script for Portfolio Application
 * 
 * This script automates the deployment process with environment checks,
 * build optimization, and deployment to various platforms.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvironment() {
  log('🔍 Checking environment configuration...', 'blue');
  
  const requiredEnvVars = [
    'MONGODB_URI',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'JWT_SECRET'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    log(`❌ Missing required environment variables: ${missingVars.join(', ')}`, 'red');
    log('Please set these variables before deployment.', 'yellow');
    process.exit(1);
  }
  
  log('✅ Environment configuration is valid', 'green');
}

function runTests() {
  log('🧪 Running tests and type checking...', 'blue');
  
  try {
    execSync('npm run type-check', { stdio: 'inherit' });
    execSync('npm run lint', { stdio: 'inherit' });
    log('✅ All tests and checks passed', 'green');
  } catch (error) {
    log('❌ Tests or type checking failed', 'red');
    process.exit(1);
  }
}

function buildApplication() {
  log('🏗️  Building application for production...', 'blue');
  
  try {
    execSync('npm run build:production', { stdio: 'inherit' });
    log('✅ Build completed successfully', 'green');
  } catch (error) {
    log('❌ Build failed', 'red');
    process.exit(1);
  }
}

function deployToVercel() {
  log('🚀 Deploying to Vercel...', 'blue');
  
  try {
    execSync('npm run deploy:vercel', { stdio: 'inherit' });
    log('✅ Deployed to Vercel successfully', 'green');
  } catch (error) {
    log('❌ Vercel deployment failed', 'red');
    throw error;
  }
}

function deployToNetlify() {
  log('🚀 Deploying to Netlify...', 'blue');
  
  try {
    execSync('npm run deploy:netlify', { stdio: 'inherit' });
    log('✅ Deployed to Netlify successfully', 'green');
  } catch (error) {
    log('❌ Netlify deployment failed', 'red');
    throw error;
  }
}

function showDeploymentInfo() {
  log('\n📋 Deployment Information:', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('🌐 Main Application: https://your-domain.com', 'bright');
  log('⚙️  Admin Portal: https://admin.your-domain.com', 'bright');
  log('📊 Analytics: Check your hosting platform dashboard', 'bright');
  log('\n🔧 Post-deployment checklist:', 'yellow');
  log('  • Test all admin routes and functionality', 'yellow');
  log('  • Verify database connections', 'yellow');
  log('  • Check email configuration (if enabled)', 'yellow');
  log('  • Monitor application performance', 'yellow');
  log('  • Set up monitoring and alerts', 'yellow');
}

async function main() {
  const platform = process.argv[2] || 'vercel';
  
  log('🚀 Starting deployment process...', 'bright');
  log(`📦 Target platform: ${platform}`, 'cyan');
  
  try {
    checkEnvironment();
    runTests();
    buildApplication();
    
    switch (platform.toLowerCase()) {
      case 'vercel':
        deployToVercel();
        break;
      case 'netlify':
        deployToNetlify();
        break;
      default:
        log(`❌ Unsupported platform: ${platform}`, 'red');
        log('Supported platforms: vercel, netlify', 'yellow');
        process.exit(1);
    }
    
    showDeploymentInfo();
    log('\n🎉 Deployment completed successfully!', 'green');
    
  } catch (error) {
    log('\n💥 Deployment failed!', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkEnvironment,
  runTests,
  buildApplication,
  deployToVercel,
  deployToNetlify
};