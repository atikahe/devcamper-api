const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

/**
 * @description Get all courses data
 * @route GET api/v1/courses/
 * @route GET api/v1/bootcamps/:bootcampId/courses
 * @access Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
  // Ignore advanced result if bootcampId exists
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    })
  }

  if (res.advancedResults.count < 1) {
    return next(new ErrorResponse('Courses not found', 404));
  }

  res.status(200).json(res.advancedResults);
});

/**
 * @description Get single course
 * @route GET /api/v1/courses/:id
 * @access Public
 */
exports.getCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id }).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course with id ${req.params.id} not found`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Showing data of ${course.title}`,
    data: course
  })
});

/**
 * @description Add course
 * @route POST /api/v1//:bootcampId/courses
 * @access Private
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ _id: req.params.bootcampId });

  if(!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id ${req.params.bootcampId}`),
      404
    );
  }

  req.body.bootcamp = req.params.bootcampId;
  const course = await Course.create(req.body)

  res.status(201).json({
    success: true,
    msg: `New course is added to ${bootcamp.name}`,
    data: course
  })
});

/**
 * @description Update course by Id
 * @route PUT /api/v1/course/:id
 * @access Prvate
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findOne({ _id: req.params.id });

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id ${req.params.id}`, 400)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    msg: `${course.title} data is updated!`,
    data: course
  });
});

/**
 * @description Delete course by Id
 * @route DELETE /api/v1/course/:id
 * @access Private
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findOne({ _id: req.params.id });

  if (course < 1) {
    return next(
      new ErrorResponse(`Deletion failed, resource not found`, 400)
    );
  }

  await course.remove();
  res.status(200).json({
    success: true,
    msg: `Resource deleted`,
  });
});