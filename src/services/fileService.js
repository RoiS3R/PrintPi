// fileService.js
import { writeFile, stat } from 'fs';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert writeFile and stat to promise-based functions for use with async/await
const writeFileSync = promisify(writeFile);
const statSync = promisify(stat);

// Convert the URL of the current module to a file path and get its directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get an available filename in the given directory.
 * If the filename is taken, append a counter to the name.
 * @param {string} directoryPath - The path to the directory where the file will be saved.
 * @param {string} filename - The original filename.
 * @return {Promise<string>} - A promise that resolves to a string of the available filename.
 */
const getAvailableFilename = async (directoryPath, filename) => {
  let baseName = path.basename(filename, path.extname(filename));
  let extension = path.extname(filename);
  let counter = 1;
  let availableFilename = filename;

  // Loop to find an available filename
  while (true) {
    try {
      // Check if the filename exists
      await statSync(path.join(directoryPath, availableFilename));
      // If it exists, create a new filename with an incremented counter
      availableFilename = `${baseName}(${counter++})${extension}`;
    } catch (err) {
      // If the file does not exist (ENOENT), the current availableFilename is returned
      if (err.code === 'ENOENT') {
        break;
      } else {
        // If a different error occurs, it is thrown
        throw err;
      }
    }
  }

  return availableFilename;
};

/**
 * Save a file to the local file system, handling duplicates by incrementing a counter.
 * @param {string} filename - The intended filename.
 * @param {Buffer} data - The file data to be saved.
 */
const saveFileToLocal = async (filename, data) => {
  // Resolve the absolute path to the local storage directory
  const directoryPath = path.resolve(__dirname, '../../localStorage');
  // Get an available filename, handling duplicates as necessary
  let availableFilename = await getAvailableFilename(directoryPath, filename);
  // Combine the directory path and the available filename to get the full file path
  const filePath = path.join(directoryPath, availableFilename);

  try {
    // Write the file to the local file system
    await writeFileSync(filePath, data);
    console.log(`Attachment saved: ${filePath}`);
  } catch (err) {
    // Log any errors that occur during file writing
    console.error('Error saving file:', err);
  }
};

// Export the saveFileToLocal function for use in other modules
export { saveFileToLocal };
