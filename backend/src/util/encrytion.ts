import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);
const key = process.env.ENCRYPTION_KEY;

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return iv.toString('base64') + ':' + encrypted;
}

export const decrypt = (hash: string) => {
  const [vi, cipher] = hash.split(':');
  const iv = Buffer.from(vi, 'base64');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(cipher, 'base64', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;

}

