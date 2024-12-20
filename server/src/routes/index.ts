const express = require('express');

import courseRoutes from './courseRoutes';
import userClerkRoutes from './userClerkRoutes';
import transactionRoutes from './transactionRoutes';
import { requireAuth } from '@clerk/express';
import userCourseProgressRoutes from './userCourseProgressRoutes';

const router = express.Router();

router.use('/courses', courseRoutes);
router.use('/users/clerk', userClerkRoutes);
router.use('/transactions', requireAuth(), transactionRoutes);
router.use('users/course-progress', requireAuth(), userCourseProgressRoutes);

export default router;
