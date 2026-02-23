import { motion, AnimatePresence } from "motion/react";
import { Clock, AlertTriangle, Zap, X, TrendingUp, Package, Crown } from "lucide-react";
import { Link } from "react-router";

interface LowMinutesWarningProps {
  isOpen: boolean;
  onClose: () => void;
  minutesRemaining: number;
  currentPlan?: 'free' | 'core' | 'pro';
  onUpgrade?: () => void;
}

export function LowMinutesWarning({ 
  isOpen, 
  onClose, 
  minutesRemaining,
  currentPlan = 'free',
  onUpgrade 
}: LowMinutesWarningProps) {
  const [timeLeft, setTimeLeft] = useState(minutesRemaining);

  useEffect(() => {
    setTimeLeft(minutesRemaining);
  }, [minutesRemaining]);

  const getUrgencyLevel = () => {
    if (minutesRemaining <= 1) return "critical";
    if (minutesRemaining <= 5) return "high";
    if (minutesRemaining <= 10) return "medium";
    return "low";
  };

  const urgency = getUrgencyLevel();

  const urgencyConfig = {
    critical: {
      gradient: "from-red-500 to-orange-600",
      bg: "from-red-50 to-orange-50",
      border: "border-red-200",
      text: "text-red-900",
      subtext: "text-red-700",
      icon: "text-red-600"
    },
    high: {
      gradient: "from-orange-500 to-amber-600",
      bg: "from-orange-50 to-amber-50",
      border: "border-orange-200",
      text: "text-orange-900",
      subtext: "text-orange-700",
      icon: "text-orange-600"
    },
    medium: {
      gradient: "from-yellow-500 to-amber-600",
      bg: "from-yellow-50 to-amber-50",
      border: "border-yellow-200",
      text: "text-yellow-900",
      subtext: "text-yellow-700",
      icon: "text-yellow-600"
    },
    low: {
      gradient: "from-blue-500 to-cyan-600",
      bg: "from-blue-50 to-cyan-50",
      border: "border-blue-200",
      text: "text-blue-900",
      subtext: "text-blue-700",
      icon: "text-blue-600"
    }
  };

  const config = urgencyConfig[urgency];

  // Upgrade options based on current plan
  const upgradeOptions = {
    free: {
      title: "Upgrade to Core or Pro",
      options: [
        { name: "Core (Habit Plan)", price: "$25/mo", minutes: "200 Minutes (3.33 Hours)", icon: Package },
        { name: "Pro (Clarity)", price: "$49/mo", minutes: "400 Minutes (6.66 Hours)", icon: Crown }
      ]
    },
    core: {
      title: "Upgrade to Pro or Add Minutes",
      options: [
        { name: "Pro (Clarity)", price: "$49/mo", minutes: "400 Minutes (6.66 Hours)", icon: Crown },
        { name: "Pay-As-You-Go", price: "$5", minutes: "25 Minutes (~0.42 Hour)", icon: Zap }
      ]
    },
    pro: {
      title: "Add More Minutes",
      options: [
        { name: "Pay-As-You-Go", price: "$5", minutes: "25 Minutes (~0.42 Hour)", icon: Zap }
      ]
    }
  };

  const currentUpgrade = upgradeOptions[currentPlan];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full pointer-events-auto overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header with Animated Icon */}
              <div className={`bg-gradient-to-br ${config.bg} border-b-2 ${config.border} p-8 text-center relative overflow-hidden`}>
                {/* Animated Background Pulse */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
                />

                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${config.gradient} rounded-full shadow-xl mb-4 relative z-10`}
                >
                  <Clock className="w-12 h-12 text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                  >
                    <AlertTriangle className={`w-5 h-5 ${config.icon}`} />
                  </motion.div>
                </motion.div>

                <h2 className={`text-2xl font-bold ${config.text} mb-2 relative z-10`}>
                  {urgency === "critical" ? "Almost Out of Minutes!" : "Low Minutes Warning"}
                </h2>
                <p className={`text-sm ${config.subtext} relative z-10`}>
                  You're running low on session time
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Minutes Remaining */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 mb-6 border-2 border-gray-100"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Time Remaining</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`text-5xl font-bold ${config.text}`}
                      >
                        {timeLeft}
                      </motion.div>
                      <span className="text-2xl font-medium text-gray-500">min</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      ({(timeLeft / 60).toFixed(2)} Hours)
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-3">
                      <motion.div
                        initial={{ width: `${Math.min((timeLeft / 30) * 100, 100)}%` }}
                        animate={{ 
                          width: `${Math.min((timeLeft / 30) * 100, 100)}%`,
                          backgroundColor: urgency === "critical" ? "#ef4444" : urgency === "high" ? "#f97316" : urgency === "medium" ? "#eab308" : "#3b82f6"
                        }}
                        className="h-full rounded-full"
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Warning Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 text-center"
                >
                  <p className="text-sm text-gray-700">
                    {urgency === "critical" 
                      ? "Your session will end in less than a minute. Upgrade or add minutes to continue." 
                      : "Consider upgrading your plan or adding minutes to ensure uninterrupted sessions with Ezri."}
                  </p>
                </motion.div>

                {/* Upgrade Options */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    {currentUpgrade.title}
                  </h3>
                  <div className="space-y-3">
                    {currentUpgrade.options.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-blue-900">{option.name}</p>
                                <p className="text-xs text-blue-700">{option.minutes}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-900">{option.price}</p>
                              {option.name !== "Pay-As-You-Go" && (
                                <p className="text-xs text-blue-600">per month</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <Link to="/app/billing" onClick={onClose}>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-bold shadow-lg hover:shadow-xl transition-all`}
                    >
                      <TrendingUp className="w-5 h-5" />
                      View Plans & Upgrade
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all"
                  >
                    Continue Session
                  </motion.button>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-center"
                >
                  <p className="text-xs text-gray-500">
                    Your session will automatically end when minutes run out.
                    {currentPlan === 'free' && " Upgrade for continuity and full features."}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}