const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();

// Load env vars
dotenv.config({ path: `${__dirname}/config/config.env` });

// Connect to database
connectDB();

// Load route files
const bootcamps = require('./routes/bootcamps');

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT, 
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.yellow
  )
)

// Handle promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
})