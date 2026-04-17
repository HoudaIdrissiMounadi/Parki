import express from 'express';
import { createBooking, getMyBookings, getOwnerBookings, cancelBooking } from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/owner', authorize('owner', 'admin'), getOwnerBookings);
router.patch('/:id/cancel', cancelBooking);

export default router;
