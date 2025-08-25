const http = require('http');

// Admin user data
const adminData = {
  email: 'bteja@gmail.com',
  password: 'bhanu4430',
  name: 'Admin User',
  role: 'admin',
  isActive: true
};

// Convert data to JSON
const postData = JSON.stringify(adminData);

// HTTP request options
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Creating admin user via API...');
console.log('Email: bteja@gmail.com');
console.log('Password: bhanu4430');
console.log('Role: admin');
console.log('');

// Make the request
const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    
    try {
      const response = JSON.parse(data);
      
      if (res.statusCode === 201) {
        console.log('✅ Admin user created successfully!');
        console.log('User ID:', response.user._id);
        console.log('');
        console.log('You can now login at: http://localhost:3000/admin/login');
        console.log('Email: bteja@gmail.com');
        console.log('Password: bhanu4430');
      } else if (res.statusCode === 400 && response.message && response.message.includes('already exists')) {
        console.log('ℹ️  Admin user already exists!');
        console.log('You can login at: http://localhost:3000/admin/login');
        console.log('Email: bteja@gmail.com');
        console.log('Password: bhanu4430');
      } else {
        console.log('❌ Error creating admin user:');
        console.log(response);
      }
    } catch (error) {
      console.log('❌ Error parsing response:');
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Request failed:');
  console.log('Make sure the development server is running with: npm run dev');
  console.log('Error:', error.message);
});

// Send the request
req.write(postData);
req.end();