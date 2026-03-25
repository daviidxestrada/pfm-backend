const express = require('express');
const router = express.Router();

const {
    getApartments,
} = require('../controllers/apartmentController');

// GET /api/apartments
router.get('/', getApartments);

module.exports = router;

