import express from 'express';
import * as bidController from '../controller/bid.controller.js';

const router = express.Router();

router.post('/save', bidController.save);
router.get('/fetch', bidController.fetch);
router.post('/update-status', bidController.updateStatus);
// Naye Active Delivery Routes:
router.get('/active-deliveries', bidController.fetchActiveDeliveries);
router.patch('/update-stage', bidController.updateStage);



export default router;