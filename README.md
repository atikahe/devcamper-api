# Devcamper API Backend

Create the backend for a bootcamp directory website.
.
## Usage

1. Install dependency

```bash
npm i
```

2. Setup mongo connection and others in src/config/config.env

```bash
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.eyab0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

3. Seed database

```bash
npm run seeder:import
```

4. Run development mode

```bash
npm run dev
```

5. Application is now available in port 5000

6. On committing new code, use [karma runner style](http://karma-runner.github.io/5.2/dev/git-commit-msg.html) message format.

```bash
git commit -m "type(<scope>): subject"
```

## Geolocation Service

Setup geolocation provider and api key src/config/config.env

```bash
GEOCODER_PROVIDER=provider_name
GEOCODER_API_KEY=provider_api_key
```

Then configure the geocoder in src/utils/geocoder.js

```bash
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  httpAdapter: 'http',
  formatter: null,
  ...otherSettingsHere
};

const geocoder = NodeGeocoder(options);
```

## Documentation

Full documentation link will go here.

## Linting and Formatting

In this project we are adopting airbnb standard (not there yet but we're heading!) enforced using `eslint` and `prettier`. Do not skip pre-commit hooks to run the formatting automatically against new code, or alternatively you can do as follows:

```
# For manual test
# Go to root folder of project
npm run lint
npm run prettier
# This will fix all linting issues
# PR is good to go
```

## Development Phase and Progress

- [x] Phase 1 : Environment Setup
- [x] Phase 2 : Dependency Setup
- [x] Phase 3 : Server setup
  - [x] Setup basic express server
  - [x] Setup controller
  - [x] Middleware setup
- [x] Phase 4 : Database setup
  - [x] Setup MongoDB database
  - [x] Configure Model for Bootcamp database
  - [x] Basic CRUD functionality
- [x] Phase 5 : Middleware setup
  - [x] Error handler middleware & custom ErrorResponse Class
  - [x] Async/Await middleware
  - [x] Use mongoose middleware
  - [x] Slugify
  - [x] Geolocation
- [x] Phase 6 : Mongoose advanced query
  - [x] Bootcamps database seeder
  - [x] Geospatial Query in Mongodb
  - [x] Filtering & Sorting
  - [x] Pagination
  - [x] Controller & Routes for Courses
  - [x] Database for Courses
  - [x] Populate, virtuals, cascade & delete
  - [x] Courses CRUD functionality
  - [x] Aggregation (calculating average cost)
  - [ ] Photo upload
  - [x] Advanced results middleware
- [x] Phase 7 : Authentication, User, & Permissions (1)
  - [x] User model
  - [x] User password encryption
  - [x] Sign & Get JWT
  - [x] User login & send token in cookie
  - [x] Protect routes with middleware
  - [x] Role authorization
- [ ] Phase 7.1 : Inforce Code Quality (Should be configured at earlier phase! But it is what it is 😺)
  - [x] Linter and code style setup
  - [ ] Unit test setup
  - [x] Run tests in git hook
- [ ] Phase 8 : Authentication, User, & Permissions (2)
- [ ] Phase 9 : Bootcamp Reviews & Ratings
- [ ] Phase 10 : API Security
- [ ] Phase 11 : Documentation & Deploy
