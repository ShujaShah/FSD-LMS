import courseRoutes from './courseRoutes';

const express = require('express');

const router = express.Router();

router.use('/courses', courseRoutes);

export default router;
