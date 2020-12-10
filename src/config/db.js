const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  
  const db = conn.connection;
  db.once('open', () => {
    console.log(`MongoDB Connected: ${db.host}`.cyan)
  })
}

module.exports = connectDB;