// emailService.js

// Importing the necessary modules for IMAP connection and email parsing
import Imap from 'imap';
import { simpleParser } from 'mailparser';

// Import the saveFileToLocal function from the fileService module for saving attachments
import { saveFileToLocal } from './fileService.js';
// Import the IMAP configuration settings from the emailConfig module
import imapConfig from '../config/emailConfig.js';

// Create a new IMAP instance with the configuration settings
const imap = new Imap(imapConfig);

// Function to open the IMAP inbox
const openInbox = (cb) => {
  imap.openBox('INBOX/Druck', true, cb);
};

// Function to check for new emails that match a specific search criteria
const checkEmails = () => {
  openInbox((err, box) => {
    if (err) throw err;

    // Search for unseen emails with a subject containing '**Print'
    imap.search(['UNSEEN', ['SUBJECT', '**Print']], (err, results) => {
      // If an error occurs or no results found, log and return
      if (err || !results || !results.length) {
        console.log('No unseen emails with the specified subject found.');
        return;
      }

      // Fetch the emails that matched the search criteria
      const fetch = imap.fetch(results, { bodies: '' });

      // Event listener for each fetched message
      fetch.on('message', (msg) => {
        console.log('Processing new email...');
        // Listen for the email body to be streamed
        msg.on('body', (stream) => {
          // Parse the email body
          simpleParser(stream, async (err, parsed) => {
            if (err) {
              console.error('Error parsing email: ', err);
              return;
            }
            // Check if the email subject is exactly '**Print'
            if (parsed.subject === '**Print') {
              console.log(`Subject: ${parsed.subject}`);
              // Access any attachments found in the email
              const attachments = parsed.attachments;
              // If there are attachments, save them locally
              if (attachments && attachments.length > 0) {
                for (const attachment of attachments) {
                  const filename = attachment.filename;
                  const data = attachment.content;
                  // Use the saveFileToLocal function from fileService to save the attachment
                  await saveFileToLocal(filename, data);
                }
              } else {
                console.log('No attachments found.');
              }
            } else {
              console.log('Email with the specified subject not found.');
            }
          });
        });
        // Once the email attributes are received, log them
        msg.once('attributes', (attrs) => {
          console.log('Email attributes: ', attrs);
        });
      });

      // If an error occurs during the fetch, log the error
      fetch.once('error', (err) => {
        console.log('Fetch error: ' + err);
      });

      // Once all messages have been processed, log and end the IMAP connection
      fetch.once('end', () => {
        console.log('Done fetching emails.');
        imap.end();
      });
    });
  });
};

// Event listeners for the IMAP connection
imap.once('ready', checkEmails); // When ready, start checking emails
imap.once('error', (err) => console.log(err)); // Log any errors
imap.once('end', () => console.log('Connection ended')); // Log when the connection ends

// Function to connect to the email server using the IMAP configuration
const connectToEmail = () => {
  imap.connect();
};

// Export the connectToEmail function for use in other modules (like server.js)
export { connectToEmail };
