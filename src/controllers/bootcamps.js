/**
 * @description Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access public
 */
exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: 'Show all bootcamps' });
}

/**
 * @description Get bootcamp by Id
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 */
exports.getBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
}

/**
 * @description Create new bootcamp
 * @route POST /api/v1/bootcamps
 * @access Private
 */
exports.createBootcamp = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, msg: `Create new bootcamp` });
}

/**
 * @description Update bootcamp by Id
 * @route PUT /api/v1/bootcamps/:id
 * @access Prvate
 */
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Updated bootcamp ${req.params.id}` });
}

/**
 * @description Delete bootcamp by Id
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
}