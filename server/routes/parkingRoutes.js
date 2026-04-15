import express from 'express';
import { getParkings, getNearbyParkings, getParkingById, createParking } from '../controllers/parkingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getParkings)
  .post(protect, authorize('owner', 'admin'), createParking);

router.get('/nearby', getNearbyParkings);
router.get('/:id', getParkingById);

export default router;
