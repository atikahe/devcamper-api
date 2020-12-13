const express = require('express');
const router = express.Router({ mergeParams: true });

// Load controllers
const { 
  getCourses
} = require('../controllers/courses');

router
  .route('/')
  .get(getCourses)

module.exports = router;