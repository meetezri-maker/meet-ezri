/**
 * Goals & Habits Routes - Placeholder
 */

import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = Router();
router.use(authenticateUser);

router.get('/', (req, res) => res.json({ message: 'Get all goals - TODO' }));
router.post('/', (req, res) => res.json({ message: 'Create goal - TODO' }));
router.get('/:id', (req, res) => res.json({ message: 'Get goal by ID - TODO' }));
router.patch('/:id', (req, res) => res.json({ message: 'Update goal - TODO' }));
router.delete('/:id', (req, res) => res.json({ message: 'Delete goal - TODO' }));
router.post('/:id/checkin', (req, res) => res.json({ message: 'Log check-in - TODO' }));

export default router;
