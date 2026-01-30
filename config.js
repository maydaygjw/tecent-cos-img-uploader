require('dotenv').config();
const fs = require('fs');
const path = require('path');
const os = require('os');

// Load config from ~/.tecent-cos-img-uploader.json if exists
let userConfig = {};
const configPath = path.join(os.homedir(), '.tecent-cos-img-uploader.json');
if (fs.existsSync(configPath)) {
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    userConfig = JSON.parse(configContent);
  } catch (error) {
    console.warn(`Warning: Failed to load config from ${configPath}:`, error.message);
  }
}

// Priority: Environment variables > User config file > Default values
module.exports = {
  secretId: process.env.COS_SECRET_ID || userConfig.secretId,
  secretKey: process.env.COS_SECRET_KEY || userConfig.secretKey,
  bucket: process.env.COS_BUCKET || userConfig.bucket,
  region: process.env.COS_REGION || userConfig.region || 'ap-guangzhou',
};
