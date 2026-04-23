import dotenv from 'dotenv';
import app from './app.js';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const bootstrap = async () => {
  try {
    await initMongoConnection();

    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

bootstrap();