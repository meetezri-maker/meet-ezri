import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  Video, 
  Heart, 
  BookOpen, 
  User,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Moon,
  Target,
  Clock,
  Sparkles,
  CreditCard,
  Menu,
  X,
  Award,
  HelpCircle,
  Shield
} from "lucide-react";
import { MobileBottomNav } from "./MobileBottomNav";
import { useState } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/app/dashboard", icon: Home, label: "Home" },
    { path: "/app/session-lobby", icon: Video, label: "Session" },
    { path: "/app/mood-checkin", icon: Heart, label: "Mood" },
    { path: "/app/journal", icon: BookOpen, label: "Journal" },
    { path: "/app/user-profile", icon: User, label: "Profile" }
  ];

  // Additional menu items for desktop and mobile drawer
  const additionalItems = [
    { path: "/app/session-history", icon: Clock, label: "Session History" },
    { path: "/app/wellness-tools", icon: Sparkles, label: "Wellness Tools" },
    { path: "/app/progress", icon: TrendingUp, label: "Progress" },
    { path: "/app/sleep-tracker", icon: Moon, label: "Sleep Tracker" },
    { path: "/app/billing", icon: CreditCard, label: "Billing & Credits" },
    { path: "/app/habit-tracker", icon: Target, label: "Habit Tracker" },
    { path: "/app/achievements", icon: Award, label: "Achievements" },
    { path: "/app/crisis-resources", icon: Shield, label: "Crisis Resources" },
    { path: "/app/help-support", icon: HelpCircle, label: "Help & Support" }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.button>

            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
                className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold"
              >
                E
              </motion.div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ezri
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/app/settings/notifications/list">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
            </Link>
            
            <Link to="/app/settings">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 sm:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 sm:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <h2 className="font-bold text-lg">Menu</h2>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.button>
              </div>

              {/* Main Navigation */}
              <nav className="p-4 space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                  Main Navigation
                </p>
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link key={item.path} to={item.path} onClick={closeMobileMenu}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                          active
                            ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}

                {/* Additional Items */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                    More Features
                  </p>
                  {additionalItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <Link key={item.path} to={item.path} onClick={closeMobileMenu}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navItems.length + index) * 0.03 }}
                          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                            active
                              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                {/* Logout Button */}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 sm:pb-6 sm:pl-72">
        {children}
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <MobileBottomNav />

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden sm:block fixed left-0 top-16 bottom-0 w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 z-30 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}

          {/* Additional Desktop Nav Items */}
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            {additionalItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      active
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}

            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02, x: 5 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </nav>
      </div>
    </div>
  );
}