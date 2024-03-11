import { MongoClient } from "mongodb";

export const connect = async (client: MongoClient) => {
  try {
    await client.connect();
    console.log(`Connected to the database 🌍`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};
