/**
 * Authentication Routes
 */

import { Router } from 'express';
import { authenticateUser } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import * as authController from '../controllers/auth.controller';

const router = Router();

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register new user
 * @access  Public
 */
router.post('/signup', asyncHandler(authController.signup));

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', asyncHandler(authController.login));

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticateUser, asyncHandler(authController.logout));

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', asyncHandler(authController.refreshToken));

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', asyncHandler(authController.forgotPassword));

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', asyncHandler(authController.resetPassword));

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', authenticateUser, asyncHandler(authController.getCurrentUser));

export default router;
