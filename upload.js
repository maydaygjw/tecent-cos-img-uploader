const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const cos = new COS({
  SecretId: config.secretId,
  SecretKey: config.secretKey,
});

function uploadFile(filePath, targetKey) {
  return new Promise((resolve, reject) => {
    const fileName = targetKey || path.basename(filePath);

    cos.putObject({
      Bucket: config.bucket,
      Region: config.region,
      Key: fileName,
      Body: fs.createReadStream(filePath),
      ContentLength: fs.statSync(filePath).size,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const url = `https://${config.bucket}.cos.${config.region}.myqcloud.com/${fileName}`;
        resolve({ ...data, url });
      }
    });
  });
}

function uploadBuffer(buffer, fileName) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: config.bucket,
      Region: config.region,
      Key: fileName,
      Body: buffer,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const url = `https://${config.bucket}.cos.${config.region}.myqcloud.com/${fileName}`;
        resolve({ ...data, url });
      }
    });
  });
}

function deleteFile(key) {
  return new Promise((resolve, reject) => {
    cos.deleteObject({
      Bucket: config.bucket,
      Region: config.region,
      Key: key,
    }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function listFiles(prefix = '') {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket: config.bucket,
      Region: config.region,
      Prefix: prefix,
    }, (err, data) => {
      if (err) reject(err);
      else resolve(data.Contents || []);
    });
  });
}

module.exports = {
  uploadFile,
  uploadBuffer,
  deleteFile,
  listFiles,
  cos,
};
