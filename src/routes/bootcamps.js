const express = require('express');
const router = express.Router();

// Load controllers
const { 
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');


router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcampById)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router
  .route('/radius/:zipcode/:distance')
  .get(getBootcampsInRadius);

module.exports = router;