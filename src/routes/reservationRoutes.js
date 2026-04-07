import express from 'express';

import { adminOnly, protect } from '../middlewares/authMiddleware.js';
import {
  createReservation,
  deleteReservation,
  getApartmentAvailability,
  getMyReservations,
  getReservationById,
  getReservations,
} from '../controllers/reservationController.js';

const router = express.Router();

router.get('/availability/:apartmentId', getApartmentAvailability);
router.get('/mine', protect, getMyReservations);
router.get('/', protect, adminOnly, getReservations);
router.get('/:id', protect, adminOnly, getReservationById);
router.post('/', protect, createReservation);
router.delete('/:id', protect, adminOnly, deleteReservation);

export default router;
