const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config({ path: `${__dirname}/src/config/config.env`});

// Load models
const Bootcamp = require('./src/models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data imported..'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log('Data deleted..'.red.inverse);
    process.exit();
  } catch(err) {
    console.error(err);
  }
}

// Create cli arguments
if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-delete') {
  deleteData();
}