// Subscription Plan Types and Configuration
// Updated with new Ezri pricing structure (Final Packages - Locked)

export type PlanTier = 'free' | 'core' | 'pro';

export interface SubscriptionPlan {
  id: PlanTier;
  name: string;
  displayName: string;
  price: number; // Monthly price in dollars
  credits: number; // Minutes per month
  creditsDisplay: string; // Display format: "X Minutes (Y Hours)"
  payAsYouGoRate: number | null; // Price per 25 minutes for PAYG (null if not available)
  payAsYouGoDisplay: string | null; // Display format for PAYG
  features: string[];
  popular?: boolean;
  trialDays?: number;
  color: string; // Brand color for UI
  gradient: string; // Gradient class
  description: string; // Plan description/tagline
}

export const SUBSCRIPTION_PLANS: Record<PlanTier, SubscriptionPlan> = {
  free: {
    id: 'free',
    name: 'Free Trial',
    displayName: 'Free Trial',
    price: 0,
    credits: 30, // 30 minutes (0.5 hour)
    creditsDisplay: '30 Minutes (0.5 Hour)',
    payAsYouGoRate: null, // No PAYG on free trial
    payAsYouGoDisplay: null,
    trialDays: 7,
    color: 'gray',
    gradient: 'from-gray-500 to-gray-600',
    description: 'Taste presence. Trigger desire.',
    features: [
      'FaceTime with Ezri (Basic)',
      'Session Start / End Protocols',
      'Minutes Deduction Tracking',
      'Crisis Detection & De-escalation',
      'Crisis Resources (Country-Aware)',
      'Emergency Contact Notification (Opt-in)',
      '7-day trial period',
      'Limited to 30 minutes total'
    ]
  },
  core: {
    id: 'core',
    name: 'Core',
    displayName: 'Core (Habit Plan)',
    price: 25,
    credits: 200, // 200 minutes (3.33 hours)
    creditsDisplay: '200 Minutes (3.33 Hours)',
    payAsYouGoRate: 5, // $5 per 25 minutes
    payAsYouGoDisplay: '$5 per 25 Minutes (~0.42 Hour)',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    description: 'For quiet overthinkers and habit builders.',
    features: [
      '200 minutes/month (3.33 hours)',
      'Pay-As-You-Go: $5 per 25 minutes',
      'Full FaceTime with Ezri',
      'Interrupted state handling',
      'Session history & analytics',
      'Daily mood check-in',
      'Complete mood history (7-day & 30-day trends)',
      'Unlimited journal entries',
      'Rich journal editor',
      'Curated wellness tools',
      'Guided tool use with Ezri',
      'Profile & avatar customization',
      'Real-time usage overview',
      'Self-serve plan management',
      'Billing history & invoices',
      'Custom notifications',
      'Accessibility preferences',
      'Real-time crisis detection',
      'De-escalation protocols',
      'Local resource surfacing',
      'Opt-in emergency contact alert'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    displayName: 'Pro (Clarity Plan)',
    price: 49,
    credits: 400, // 400 minutes (6.66 hours)
    creditsDisplay: '400 Minutes (6.66 Hours)',
    payAsYouGoRate: 5, // $5 per 25 minutes (same rate)
    payAsYouGoDisplay: '$5 per 25 Minutes (~0.42 Hour)',
    popular: true,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    description: 'For high-functioning holders and decision-makers.',
    features: [
      '400 minutes/month (6.66 hours)',
      'Pay-As-You-Go: $5 per 25 minutes',
      'Everything in Core, plus:',
      'Longer uninterrupted sessions',
      'Priority system handling',
      'Priority resource allocation',
      'Extended mood trends (7/30/90 days)',
      'Export-ready journaling structure',
      'Stronger session continuity',
      'Full wellness tool library access',
      'Deeper guided sessions',
      'Detailed session history logs',
      'Usage transparency dashboard',
      'Enhanced privacy controls',
      'Same universal crisis system',
      'Standard de-escalation protocols'
    ]
  }
};

// User Subscription Interface
export interface UserSubscription {
  userId: string;
  planId: PlanTier;
  status: 'active' | 'expired' | 'cancelled' | 'trial';
  creditsRemaining: number; // Minutes left this billing cycle
  creditsTotal: number; // Total minutes for this plan
  billingCycle: {
    startDate: string; // ISO date
    endDate: string; // ISO date
    renewsOn: string | null; // ISO date or null if cancelled
  };
  payAsYouGoCredits: number; // Extra minutes purchased
  totalSpent: number; // Total amount spent
  usageHistory: UsageRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface UsageRecord {
  id: string;
  date: string; // ISO date
  minutesUsed: number;
  sessionType: 'ai-avatar' | 'therapist'; // For future therapist feature
  avatarName?: string;
  cost: number; // Cost of this session (0 for included minutes, PAYG rate for extra)
}

export interface PayAsYouGoPurchase {
  id: string;
  userId: string;
  planId: PlanTier;
  minutesPurchased: number;
  packageSize: number; // 25 minutes
  pricePerPackage: number; // $5
  totalCost: number;
  purchaseDate: string; // ISO date
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  expiresAt: string; // PAYG minutes expire monthly - no rollover
}

// Helper Functions
export function getAvailablePAYGRate(planId: PlanTier): number | null {
  return SUBSCRIPTION_PLANS[planId].payAsYouGoRate;
}

export function canUsePAYG(planId: PlanTier): boolean {
  // PAYG only available for Core & Pro (not Free Trial)
  return planId !== 'free' && SUBSCRIPTION_PLANS[planId].payAsYouGoRate !== null;
}

export function calculatePAYGCost(minutes: number): number {
  // PAYG is $5 per 25 minutes for both Core and Pro
  const packages = Math.ceil(minutes / 25);
  return packages * 5;
}

export function calculatePAYGMinutes(cost: number): number {
  // How many minutes can be purchased with given cost
  const packages = Math.floor(cost / 5);
  return packages * 25;
}

export function getRemainingTrialDays(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, 7 - diffDays);
}

export function formatMinutes(minutes: number): string {
  const hours = (minutes / 60).toFixed(2);
  return `${minutes} Minutes (${hours} Hours)`;
}

export function formatMinutesShort(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} mins`;
}

export function isSubscriptionActive(subscription: UserSubscription): boolean {
  const now = new Date();
  const endDate = new Date(subscription.billingCycle.endDate);
  return subscription.status === 'active' && now <= endDate;
}

export function shouldWarnLowCredits(creditsRemaining: number): boolean {
  return creditsRemaining <= 10 && creditsRemaining > 0;
}

export function hasCreditsRemaining(subscription: UserSubscription): boolean {
  return subscription.creditsRemaining > 0 || subscription.payAsYouGoCredits > 0;
}

// Global Rules (apply to all plans)
export const GLOBAL_RULES = {
  crisisDetection: 'INCLUDED', // Crisis detection & de-escalation included in all plans
  crisisResources: 'INCLUDED', // Crisis resources surfaced (country-aware)
  emergencyContact: 'OPT_IN_ONLY', // Emergency contact notification opt-in only
  noTherapyClaims: 'PROHIBITED', // No therapy claims allowed
  noUnlimitedUsage: 'PROHIBITED', // No unlimited usage allowed
  safetyNotPremium: 'Safety is not a premium feature' // Safety universal across all tiers
};

// Display conventions
export const DISPLAY_STANDARDS = {
  timeFormat: 'Minutes (Hours)', // ISO-aligned display: "200 Minutes (3.33 Hours)"
  payAsYouGoPackage: '25 Minutes (~0.42 Hour)',
  payAsYouGoPrice: '$5',
  billingCycle: 'Monthly (resets monthly)',
  rollover: 'None (PAYG minutes expire monthly)'
};
