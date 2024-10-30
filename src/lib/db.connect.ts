import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Database connection failed --> ", error);
    process.exit(1);
  }
}

export async function dbDisconnect(): Promise<void> {
  if (connection.isConnected) {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    connection.isConnected = 0;
  }
}

export default dbConnect;
