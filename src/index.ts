import app from './app';
import connectDB from './db/db';
import dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

const server = createServer(app);

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION 😁');
  process.exit(1);
});

const port = process.env.PORT ?? 5000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
  connectDB();
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION 😁');
  server.close(() => {
    process.exit(1);
  });
});
