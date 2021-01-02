const express = require('express');
const router = express.Router({ mergeParams: true });

// Load controllers
const { 
  getCourses,
  getCourseById,
  addCourse ,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const advancedResults = require('../middleware/advancedResults');
const Course = require('../models/Course');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(addCourse)

router
  .route('/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse)

module.exports = router;