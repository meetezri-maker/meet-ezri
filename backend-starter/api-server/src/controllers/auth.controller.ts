/**
 * Authentication Controller
 */

import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { ValidationError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * Register new user
 */
export async function signup(req: Request, res: Response) {
  const { email, password, fullName } = req.body;

  // Validation
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  if (password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }

  // Create user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    logger.error('Signup error:', error);
    return res.status(400).json({ 
      error: 'Signup Failed',
      message: error.message 
    });
  }

  // Create user profile in public.users table
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        role: 'user',
        status: 'active',
      });

    if (profileError) {
      logger.error('Profile creation error:', profileError);
    }
  }

  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: data.user?.id,
      email: data.user?.email,
    },
    session: data.session,
  });
}

/**
 * Login user
 */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    logger.error('Login error:', error);
    return res.status(401).json({ 
      error: 'Login Failed',
      message: 'Invalid credentials' 
    });
  }

  // Update last_active_at
  await supabase
    .from('users')
    .update({ last_active_at: new Date().toISOString() })
    .eq('id', data.user.id);

  res.json({
    message: 'Login successful',
    user: {
      id: data.user.id,
      email: data.user.email,
    },
    session: data.session,
  });
}

/**
 * Logout user
 */
export async function logout(req: Request, res: Response) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    logger.error('Logout error:', error);
    return res.status(500).json({ 
      error: 'Logout Failed',
      message: error.message 
    });
  }

  res.json({ message: 'Logout successful' });
}

/**
 * Refresh access token
 */
export async function refreshToken(req: Request, res: Response) {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    throw new ValidationError('Refresh token is required');
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) {
    logger.error('Token refresh error:', error);
    return res.status(401).json({ 
      error: 'Token Refresh Failed',
      message: error.message 
    });
  }

  res.json({
    message: 'Token refreshed successfully',
    session: data.session,
  });
}

/**
 * Send password reset email
 */
export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    throw new ValidationError('Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
  });

  if (error) {
    logger.error('Password reset error:', error);
    return res.status(500).json({ 
      error: 'Password Reset Failed',
      message: error.message 
    });
  }

  res.json({ 
    message: 'Password reset email sent successfully' 
  });
}

/**
 * Reset password with token
 */
export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body;

  if (!token || !password) {
    throw new ValidationError('Token and new password are required');
  }

  if (password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    logger.error('Password update error:', error);
    return res.status(400).json({ 
      error: 'Password Reset Failed',
      message: error.message 
    });
  }

  res.json({ 
    message: 'Password reset successfully' 
  });
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(req: Request, res: Response) {
  const userId = req.user?.id;

  if (!userId) {
    throw new ValidationError('User not authenticated');
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    logger.error('Get user error:', error);
    return res.status(404).json({ 
      error: 'User Not Found',
      message: error.message 
    });
  }

  res.json({ user });
}
