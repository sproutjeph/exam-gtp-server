import fs from "fs-extra";

// Define source and destination paths
const sourcePath = "src/mails"; // Path to the emails folder
const destinationPath = "build/src/mails"; // Path to the build output folder

// Ensure the destination folder exists
fs.ensureDirSync(destinationPath);

// Copy files from the source to the destination
fs.copySync(sourcePath, destinationPath);
