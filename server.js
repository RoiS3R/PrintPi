// server.js
// emailConfig.js
import {} from 'dotenv/config';
import { connectToEmail } from './src/services/emailService.js';

console.log('Starting email processing server...');

// Call the function to connect to the email server and begin processing
connectToEmail();

// Handle any uncaught exceptions to prevent the server from crashing
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
