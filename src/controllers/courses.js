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

/**
 * @description Get course by Id
 * @route GET /api/v1/courses/:id
 * @access Public
 */
exports.getCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id });
  if (!course) {
    next(
      ErrorResponse(`Course not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Showing data of ${course.name}`,
    data: course
  })
});

/**
 * @description Create new course
 * @route POST /api/v1/courses
 * @access Private
 */
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    msg: `New data of ${course.name} is created`,
    data: course
  })
});

/**
 * @description Update course by Id
 * @route PUT /api/v1/course/:id
 * @access Prvate
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    msg: `${course.name} data is updated!`,
    data: course
  });
});

/**
 * @description Delete course by Id
 * @route DELETE /api/v1/course/:id
 * @access Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id });

  if (course < 1) {
    return next(
      new ErrorResponse(`Deletion failed, resource not found`, 400)
    );
  }

  course.remove();
  res.status(200).json({
    success: true,
    msg: `Resource deleted`,
  });
});