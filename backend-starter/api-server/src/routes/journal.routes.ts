/**
 * Journal Routes - Placeholder
 */

import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = Router();
router.use(authenticateUser);

router.get('/entries', (req, res) => res.json({ message: 'Get journal entries - TODO' }));
router.post('/entries', (req, res) => res.json({ message: 'Create journal entry - TODO' }));
router.get('/prompts', (req, res) => res.json({ message: 'Get journal prompts - TODO' }));
router.get('/analytics', (req, res) => res.json({ message: 'Get journal analytics - TODO' }));

export default router;
