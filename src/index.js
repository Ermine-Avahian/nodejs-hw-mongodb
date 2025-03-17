import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const boot = async () => {
  await initMongoConnection();
  setupServer();
};

boot();
