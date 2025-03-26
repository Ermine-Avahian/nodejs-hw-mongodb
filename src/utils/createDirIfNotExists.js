import fs from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
  try {
    console.log(`Creating directory: ${url}`);

    await fs.access(url);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
