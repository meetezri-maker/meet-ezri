/**
 * Crisis Management Routes - Placeholder
 */

import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = Router();
router.use(authenticateUser);

router.get('/resources', (req, res) => res.json({ message: 'Get crisis resources - TODO' }));
router.post('/alerts', (req, res) => res.json({ message: 'Create crisis alert - TODO' }));
router.get('/alerts', (req, res) => res.json({ message: 'Get crisis alerts - TODO' }));
router.post('/contacts', (req, res) => res.json({ message: 'Add trusted contact - TODO' }));
router.get('/contacts', (req, res) => res.json({ message: 'Get trusted contacts - TODO' }));

export default router;
