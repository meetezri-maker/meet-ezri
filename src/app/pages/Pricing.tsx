import { Link } from "react-router";
import { PublicNav } from "../components/PublicNav";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { motion } from "motion/react";
import { Heart, Video, Shield, Clock, Sparkles, CheckCircle2, ArrowRight, Zap, Check, Crown, X } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "../utils/subscriptionPlans";
import type { PlanTier } from "../utils/subscriptionPlans";

export function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-white">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
              <Crown className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700 font-semibold">Simple, Transparent Pricing</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Choose Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Wellness Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with a 7-day free trial. Upgrade for mood tracking, journaling, and wellness tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {(Object.keys(SUBSCRIPTION_PLANS) as PlanTier[]).map((planId, index) => {
            const plan = SUBSCRIPTION_PLANS[planId];
            const isPopular = plan.popular;
            
            return (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {isPopular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <Card className={`p-6 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  isPopular 
                    ? 'border-2 border-purple-500 shadow-lg shadow-purple-500/20 scale-105' 
                    : 'border border-border hover:border-purple-300'
                }`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <div className="relative z-10">
                    {/* Plan Header */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} mb-4`}>
                        {planId === 'free' && <Sparkles className="w-6 h-6 text-white" />}
                        {planId === 'core' && <Heart className="w-6 h-6 text-white" />}
                        {planId === 'pro' && <Zap className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{plan.displayName}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          ${plan.price}
                        </span>
                        {plan.price > 0 && (
                          <span className="text-muted-foreground">/month</span>
                        )}
                      </div>
                      {planId === 'free' && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {plan.trialDays} days free
                        </p>
                      )}
                    </div>

                    {/* Credits */}
                    <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-purple-900">AI Companion Time</span>
                        <Video className="w-4 h-4 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-purple-700">
                        {plan.credits} minutes
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        {planId === 'free' 
                          ? 'One-time trial credits' 
                          : 'Refreshes monthly'}
                      </p>
                    </div>

                    {/* Pay-as-you-go Rate */}
                    {plan.payAsYouGoRate !== null ? (
                      <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-900">
                            Pay-As-You-Go Available
                          </span>
                        </div>
                        <p className="text-lg font-bold text-green-700">
                          ${plan.payAsYouGoRate} per 25 min
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Add extra minutes anytime
                        </p>
                      </div>
                    ) : (
                      <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            No pay-as-you-go option
                          </span>
                        </div>
                      </div>
                    )}

                    {/* All Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm">What's Included:</h4>
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isPopular ? 'text-purple-600' : 'text-green-600'
                            }`} />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link to="/signup" className="block">
                      <Button 
                        className={`w-full ${
                          isPopular 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30' 
                            : planId === 'free'
                            ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
                            : ''
                        }`}
                        size="lg"
                      >
                        {planId === 'free' ? 'Start Free Trial' : 'Get Started'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>

                    {planId === 'free' && (
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        No credit card required
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Additional Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 mb-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Flexible Plans, No Long-Term Commitments
                </h4>
                <p className="text-sm text-blue-700">
                  Start with a free trial, upgrade or downgrade anytime. Cancel whenever you want. 
                  PAYG available on Core & Pro plans at a flat $5 per 25 minutes rate. 
                  Core & Pro plans include mood tracking, journaling, and wellness tools.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h4 className="font-semibold text-green-900 mb-4">Safety Included for Everyone</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-800">Crisis detection and de-escalation protocols</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-800">Country-aware crisis resources surfacing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-800">Opt-in emergency contact notifications</span>
              </li>
            </ul>
            <p className="text-xs text-green-700 mt-4 italic">
              Safety features are universal across all plans and never locked behind a paywall.
            </p>
          </Card>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Can I change plans later?",
              a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
            },
            {
              q: "What happens when I run out of minutes?",
              a: "If you're on Core or Pro, you can purchase additional minutes via Pay-As-You-Go at $5 per 25 minutes. Free trial users need to upgrade to continue."
            },
            {
              q: "Do unused minutes roll over?",
              a: "No, minutes reset monthly with your subscription. Pay-As-You-Go minutes also expire at the end of each billing cycle."
            },
            {
              q: "Is there a discount for annual plans?",
              a: "We currently offer monthly billing only. Annual plans may be available in the future."
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_80%)]" />
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start?</h2>
            </motion.div>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Join thousands who trust Ezri for their mental health and wellbeing
            </p>
            <Link to="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="mb-4">
                  Start Your Free Trial
                </Button>
              </motion.div>
            </Link>
            <p className="text-sm text-muted-foreground">
              7-day free trial • No credit card required
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}