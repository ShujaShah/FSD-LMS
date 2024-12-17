const express = require('express');

import courseRoutes from './courseRoutes';
import userClerkRoutes from './userClerkRoutes';

const router = express.Router();

router.use('/courses', courseRoutes);
router.use('/users/clerk', userClerkRoutes);

export default router;
