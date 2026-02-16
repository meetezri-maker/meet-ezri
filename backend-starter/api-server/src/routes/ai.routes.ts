/**
 * AI Routes (Proxy to Python AI Service) - Placeholder
 */

import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = Router();
router.use(authenticateUser);

router.post('/conversation/start', (req, res) => res.json({ message: 'Start conversation - TODO' }));
router.post('/conversation/message', (req, res) => res.json({ message: 'Send message - TODO' }));
router.get('/conversations', (req, res) => res.json({ message: 'Get conversations - TODO' }));
router.post('/voice/synthesize', (req, res) => res.json({ message: 'Text-to-speech - TODO' }));
router.post('/voice/transcribe', (req, res) => res.json({ message: 'Speech-to-text - TODO' }));

export default router;
