import dotenv from 'dotenv';

dotenv.config();
export const getEnvVar = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Env variable ${key} is not set`);
  }
  return value;
};
