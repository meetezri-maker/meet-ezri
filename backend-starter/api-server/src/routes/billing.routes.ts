/**
 * Billing & Subscriptions Routes - Placeholder
 */

import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';

const router = Router();
router.use(authenticateUser);

router.get('/subscription', (req, res) => res.json({ message: 'Get subscription - TODO' }));
router.post('/subscription', (req, res) => res.json({ message: 'Create subscription - TODO' }));
router.patch('/subscription', (req, res) => res.json({ message: 'Update subscription - TODO' }));
router.delete('/subscription', (req, res) => res.json({ message: 'Cancel subscription - TODO' }));
router.get('/invoices', (req, res) => res.json({ message: 'Get invoices - TODO' }));
router.post('/webhook', (req, res) => res.json({ message: 'Stripe webhook - TODO' }));

export default router;
