import express from 'express';

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
router.post('/', createApartment);
router.put('/:id', updateApartment);
router.delete('/:id', deleteApartment);

export default router;
