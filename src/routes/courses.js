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

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(protect, authorize('admin', 'publisher'), addCourse)

router
  .route('/:id')
  .get(getCourseById)
  .put(protect, authorize('admin', 'publisher'), updateCourse)
  .delete(protect, authorize('admin', 'publisher'), deleteCourse)

module.exports = router;