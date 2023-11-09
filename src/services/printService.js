import * as ipp from 'ipp';
import { readFileSync } from 'fs';

// Replace with the actual IPP printer URL and path to the PDF you want to print
const printerUrl = 'http://printer.example.com:631/ipp/print';
const pdfFilePath = 'path/to/file.pdf';

// Read the PDF file using the readFileSync method from the fs module
const pdfData = readFileSync(pdfFilePath);

// Create an IPP printer instance with the specified URL
const printer = new ipp.Printer(printerUrl);

// Define the IPP attributes for the print job
const msg = {
  'operation-attributes-tag': {
    'requesting-user-name': 'John Doe',
    'job-name': 'My Test Job',
    'document-format': 'application/pdf',
  },
  data: pdfData, // The actual PDF data
};

// Send the print job to the printer using an arrow function for the callback
printer.execute('Print-Job', msg, (err, res) => {
  if (err) {
    console.error('Print job failed:', err);
    return;
  }
  console.log('Print job response:', res);
});
