const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./src/config/db');

console.log('Seeder running..'.yellow)

// Load env vars
dotenv.config({ path: `${__dirname}/src/config/config.env`});

// Load models
const Bootcamp = require('./src/models/Bootcamp');

// Read JSON files
const fetchJsonData = () => {
  console.log('Fetching json..');
  const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
  )
  if (bootcamps) console.log('Fetch completed'.cyan);
  return bootcamps;
}

// Import into DB
const importData = async (data) => {
  console.log('Import data starting..');
  await Bootcamp.create(data);

  console.log('Data imported'.cyan.inverse);
}

// Delete from DB
const deleteData = async () => {
  console.log('Delete data starting..');
  await Bootcamp.deleteMany();

  console.log('Data destroyed'.red.inverse);
}

// Create cli arguments
if (process.argv[2] === '-import') {
  console.log('Connecting to database..');
  connectDB()
    .then(fetchJsonData)
    .then(data => importData(data))
    .then(() => process.exit())
    .catch((e) => {
      console.error(e);
      process.exit();
    })
} else if (process.argv[2] === '-delete') {
  console.log('Connecting to database..');
  connectDB()
    .then(deleteData)
    .then(() => process.exit())
    .catch((e) => {
      console.error(e);
      process.exit();
    })
} else {
  console.log('Command not available'.red);
  process.exit();
}