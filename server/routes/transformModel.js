import express from 'express';

import { getPositions } from '../controllers/transformModel.js';

const router = express.Router();

router.get('/', getPositions);

export default router;