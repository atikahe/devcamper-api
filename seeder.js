const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./src/config/db');

console.log('Seeder running..'.yellow);

// Load env vars
dotenv.config({ path: `${__dirname}/src/config/config.env` });

// Load models
const Bootcamp = require('./src/models/Bootcamp');
const Course = require('./src/models/Course');
const User = require('./src/models/User');

// Read JSON files
const fetchJsonData = () => {
  console.log('Fetching json..');
  const data = [];
  const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
  );
  const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
  );
  const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
  );
  if (bootcamps && courses) {
    console.log('Fetch completed'.cyan);
    data.push(bootcamps);
    data.push(courses);
    data.push(users);
  }
  return data;
};

// Import into DB
const importData = async (data) => {
  console.log('Import data starting..');
  await Bootcamp.create(data[0]);
  await Course.create(data[1]);
  await User.create(data[2]);
};

// Delete from DB
const deleteData = async () => {
  console.log('Delete data starting..');
  await Bootcamp.deleteMany();
  await Course.deleteMany();
  await User.deleteMany();
};

// Create cli arguments
if (process.argv[2] === '-import') {
  console.log('Connecting to database..');
  connectDB()
    .then(fetchJsonData)
    .then((data) => importData(data))
    .then(() => {
      console.log('Data imported'.cyan.inverse);
      process.exit();
    })
    .catch((e) => {
      console.error(e);
      process.exit();
    });
} else if (process.argv[2] === '-delete') {
  console.log('Connecting to database..');
  connectDB()
    .then(deleteData)
    .then(() => {
      console.log('Data destroyed'.red.inverse);
      process.exit();
    })
    .catch((e) => {
      console.error(e);
      process.exit();
    });
} else {
  console.log('Command not available'.red);
  process.exit();
}
