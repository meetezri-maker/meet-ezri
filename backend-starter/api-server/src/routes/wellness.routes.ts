/**
 * Wellness Routes - Placeholder
 */

import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = Router();
router.use(authenticateUser);

router.get('/content', (req, res) => res.json({ message: 'Get wellness content - TODO' }));
router.get('/content/:id', (req, res) => res.json({ message: 'Get content by ID - TODO' }));
router.post('/progress', (req, res) => res.json({ message: 'Track progress - TODO' }));
router.get('/recommendations', (req, res) => res.json({ message: 'Get recommendations - TODO' }));

export default router;
