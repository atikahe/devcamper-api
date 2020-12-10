const express = require('express');
const router = express.Router();

// Load controllers
const { 
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp
} = require('../controllers/bootcamps');

router.get('/', getBootcamps);

router.get('/:id', getBootcampById);

router.post('/', createBootcamp);

router.put('/:id', updateBootcamp);

router.delete('/:id', deleteBootcamp);

module.exports = router;