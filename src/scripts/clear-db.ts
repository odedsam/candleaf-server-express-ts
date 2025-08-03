import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const clearDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const collections = await mongoose.connection.db!.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(`Cleared collection: ${collection.collectionName}`);
    }

    console.log('All collections cleared.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error clearing DB:', err);
    process.exit(1);
  }
};

clearDB();
