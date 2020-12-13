const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

/**
 * @description Get all bootcamps data
 * @route GET api/v1/courses/
 * @route GET api/v1/bootcamps/:bootcampId/courses
 * @access Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const courses = await query.populate({
    path: 'bootcamp',
    select: 'name'
  });

  if (!courses) {
    next(ErrorResponse('Courses not found', 404));
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});