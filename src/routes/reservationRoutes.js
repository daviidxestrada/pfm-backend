import express from 'express';

import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
} from '../controllers/reservationController.js';

const router = express.Router();

router.get('/', getReservations);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.delete('/:id', deleteReservation);

export default router;
