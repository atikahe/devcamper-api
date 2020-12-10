const Bootcamp = require('../models/Bootcamp');

/**
 * @description Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access public
 */
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      msg: `Showing all bootcamps`,
      count: bootcamps.length,
      data: bootcamps
    })
  }catch (err){
    res.status(400).json({
      success: false,
      msg: err.message
    })
  }
}

/**
 * @description Get bootcamp by Id
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 */
exports.getBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findOne({ _id: req.params.id });

    if (!bootcamp) {
      throw new Error('Data not found');
    }

    res.status(200).json({
      success: true,
      msg: `Showing data of ${bootcamp.name}`,
      data: bootcamp
    })
    
  }catch (err){
    res.status(400).json({
      success: false,
      msg: err.message
    })
  }
}

/**
 * @description Create new bootcamp
 * @route POST /api/v1/bootcamps
 * @access Private
 */
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      msg: `New data of ${bootcamp.name} is created`,
      data: bootcamp
    })
  }catch (err){
    res.status(400).json({
      success: false,
      msg: err.message
    })
  }
}

/**
 * @description Update bootcamp by Id
 * @route PUT /api/v1/bootcamps/:id
 * @access Prvate
 */
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      throw new Error('Data not found')
    }

    res.status(200).json({
      success: true,
      msg: `${bootcamp.name} data is updated!`,
      data: bootcamp
    })

  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message
    })
  }
}

/**
 * @description Delete bootcamp by Id
 * @route DELETE /api/v1/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.deleteOne({ _id: req.params.id });

    if (!bootcamp) {
      throw new Error('Data not found')
    }

    res.status(200).json({
      success: true,
      msg: `${bootcamp.deletedCount} data is deleted`
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message
    })
  }
}