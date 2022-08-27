import mongoose from 'mongoose';

const connection = {};

const connect = async () => {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    //mongo connections are already in queue
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      //readystate is 1, means already connected
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
};

const db = { connect, disconnect };
export default db;
