import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const url = process.env.MONGODB_URL;
  const dbName = process.env.MONGODB_DB;

  const mongoUri = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority&appName=YusufSoylu`;

  await mongoose.connect(mongoUri);

  console.log('Mongo connection successfully established');
};