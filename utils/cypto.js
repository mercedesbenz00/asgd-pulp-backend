const crypto = require('crypto');
require('dotenv').config();

const iv = Buffer.alloc(16); // zeroed-out iv
const algorithm = 'aes-256-gcm';
const ENCRYPTION_KEY =  process.env.ENCRYPTION_KEY || "abcdefghijklmn0987654321zxcvbn12";

exports.encrypt = (plainText) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const tag = cipher.getAuthTag().toString('base64');                 // Fix: Decode with binary/latin1!
  encrypted += '|' + tag;
  return encrypted; 
}

exports.decrypt = (encrypted) => {
  const authTag = encrypted.split('|')[1];
  const decrypt = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
  decrypt.setAuthTag(Buffer.from(authTag, 'base64'));
  let text = decrypt.update(encrypted.split('|')[0], 'base64', 'utf8');
  text += decrypt.final('utf8')
  return text;
}