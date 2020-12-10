const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @description Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    msg: `Showing all bootcamps`,
    count: bootcamps.length,
    data: bootcamps
  })
});

/**
 * @description Get bootcamp by Id
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 */
exports.getBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    msg: `Showing data of ${bootcamp.name}`,
    data: bootcamp
  });
});

/**
 * @description Create new bootcamp
 * @route POST /api/v1/bootcamps
 * @access Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    msg: `New data of ${bootcamp.name} is created`,
    data: bootcamp
  })
});

/**
 * @description Update bootcamp by Id
 * @route PUT /api/v1/bootcamps/:id
 * @access Prvate
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    msg: `${bootcamp.name} data is updated!`,
    data: bootcamp
  });
});

/**
 * @description Delete bootcamp by Id
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.deleteOne({ _id: req.params.id });

  if (bootcamp.deletedCount < 1) {
    return next(
      new ErrorResponse(`Deletion failed, resource not found`, 400)
    );
  }

  res.status(200).json({
    success: true,
    msg: `Resource found, ${bootcamp.deletedCount} data is deleted`
  });
});