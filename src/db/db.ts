import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Db: string =
  (process.env.NODE_ENV as string) === 'development'
    ? (process.env.LOCAL_DATABASE as string)
    : (process.env.PROD_DATABASE as string);
const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
function connectDB() {
  mongoose
    .connect(Db, options)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((err) => {
      console.error('Error connecting to database', err);
    });
}

export default connectDB;
