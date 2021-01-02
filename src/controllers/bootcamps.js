const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');
// const { parseQuery } = require('../utils/helpers');

/**
 * @description Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  if (res.advancedResults.count < 1) {
    return next(
      new ErrorResponse(`Database empty`, 404)
    )
  }

  res.status(200).json(res.advancedResults);
  // res.status(200).json({
  //   success: true,
  //   msg: `Showing all bootcamps`,
  //   pagination,
  //   count: bootcamps.length,
  //   data: bootcamps
  // })
});

/**
 * @description Get bootcamp by Id
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 */
exports.getBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id }).populate({
    path: 'courses',
    select: 'title description'
  });

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
      new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 400)
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
  const bootcamp = await Bootcamp.findOne({ _id: req.params.id });

  if (bootcamp < 1) {
    return next(
      new ErrorResponse(`Deletion failed, resource not found`, 400)
    );
  }

  bootcamp.remove();
  res.status(200).json({
    success: true,
    msg: `Resource deleted`
  });
});

/**
 * @description Get bootcamps within a radius
 * @route GET /api/v1/bootcamps/radius/:zipcode/:distance
 * @access Private
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from zipcode
  const [loc] = await geocoder.geocode(zipcode);
  const { latitude, longitude } = loc;

  // Calc radius using radians
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius]
      }
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  })
});
