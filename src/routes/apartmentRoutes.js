import express from 'express';

import { adminOnly, protect } from '../middlewares/authMiddleware.js';
import {
  createApartment,
  deleteApartment,
  getApartmentById,
  getApartments,
  updateApartment,
} from '../controllers/apartmentController.js';

const router = express.Router();

router.get('/', getApartments);
router.get('/:id', getApartmentById);
router.post('/', protect, adminOnly, createApartment);
router.put('/:id', protect, adminOnly, updateApartment);
router.delete('/:id', protect, adminOnly, deleteApartment);

export default router;
