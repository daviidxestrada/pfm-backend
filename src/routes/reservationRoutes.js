const express = require('express');
const router = express.Router();

const {
    getReservations,
    getReservationById,
    createReservation,
    deleteReservation
} = require('../controllers/reservationController');

// CRUD
router.get('/', getReservations);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.delete('/:id', deleteReservation);

module.exports = router;