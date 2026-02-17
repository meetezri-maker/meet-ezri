import { AppLayout } from "../../components/AppLayout";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  AlertTriangle,
  Heart,
  Phone,
  Activity,
  MapPin,
  BookOpen,
  Users,
  Download,
  Sparkles,
  Copy,
  Check,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";

interface SafetyPlanSection {
  id: string;
  title: string;
  icon: any;
  items: string[];
  placeholder: string;
}

export function SafetyPlan() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SafetyPlanSection[]>([
    {
      id: "warning-signs",
      title: "Warning Signs",
      icon: AlertTriangle,
      items: [
        "Feeling overwhelmed or hopeless",
        "Difficulty sleeping for more than 2 nights",
        "Withdrawing from friends and family"
      ],
      placeholder: "Add a warning sign..."
    },
    {
      id: "coping-strategies",
      title: "Coping Strategies",
      icon: Heart,
      items: [
        "Call a trusted friend or family member",
        "Practice deep breathing exercises",
        "Go for a walk outside",
        "Listen to calming music"
      ],
      placeholder: "Add a coping strategy..."
    },
    {
      id: "distractions",
      title: "Healthy Distractions",
      icon: Activity,
      items: [
        "Watch a favorite movie or TV show",
        "Play with my pet",
        "Do a puzzle or play games"
      ],
      placeholder: "Add a distraction..."
    },
    {
      id: "safe-people",
      title: "People I Can Contact",
      icon: Users,
      items: [
        "Sarah Johnson - (555) 123-4567",
        "Mike Chen - (555) 987-6543",
        "Dr. Emily Roberts - (555) 246-8135"
      ],
      placeholder: "Add a contact person..."
    },
    {
      id: "safe-places",
      title: "Safe Places",
      icon: MapPin,
      items: [
        "Local park - Main St & 5th Ave",
        "Coffee shop - Downtown",
        "Library - Reading room"
      ],
      placeholder: "Add a safe place..."
    },
    {
      id: "reasons-to-live",
      title: "Reasons to Live",
      icon: Heart,
      items: [
        "My family and friends who care about me",
        "My future goals and dreams",
        "The positive impact I can make in the world"
      ],
      placeholder: "Add a reason..."
    }
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleAddItem = (sectionId: string, newItem: string) => {
    if (!newItem.trim()) return;
    
    setSections(sections.map(section => 
      section.id === sectionId
        ? { ...section, items: [...section.items, newItem] }
        : section
    ));
  };

  const handleDeleteItem = (sectionId: string, itemIndex: number) => {
    setSections(sections.map(section => 
      section.id === sectionId
        ? { ...section, items: section.items.filter((_, i) => i !== itemIndex) }
        : section
    ));
  };

  const handleCopySection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const text = `${section.title}\n${section.items.map(item => `• ${item}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadPDF = () => {
    // Create a styled HTML content for printing
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Safety Plan - Ezri</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #6366f1;
              border-bottom: 3px solid #6366f1;
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            h2 {
              color: #4f46e5;
              margin-top: 30px;
              margin-bottom: 15px;
              font-size: 20px;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              padding: 10px;
              margin: 8px 0;
              background: #f9fafb;
              border-left: 4px solid #6366f1;
              border-radius: 4px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
            .emergency {
              background: #fee2e2;
              border: 2px solid #ef4444;
              padding: 20px;
              border-radius: 8px;
              margin: 30px 0;
              text-align: center;
            }
            .emergency strong {
              color: #dc2626;
              font-size: 18px;
            }
            @media print {
              body { margin: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🛡️ My Safety Plan</h1>
            <p>Created with Ezri Mental Health App</p>
            <p><em>Date: ${new Date().toLocaleDateString()}</em></p>
          </div>

          ${sections.map(section => `
            <div>
              <h2>${section.title}</h2>
              <ul>
                ${section.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}

          <div class="emergency">
            <strong>🚨 EMERGENCY CONTACTS</strong>
            <p>National Suicide Prevention Lifeline: 988</p>
            <p>Crisis Text Line: Text HOME to 741741</p>
            <p>Emergency Services: 911</p>
          </div>

          <div class="footer">
            <p>This safety plan is personal and confidential.</p>
            <p>Keep it in a place where you can easily access it when needed.</p>
          </div>
        </body>
      </html>
    `;

    // Open print dialog which allows saving as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">My Safety Plan</h1>
          </div>
          <p className="text-muted-foreground">
            Your personalized plan for managing difficult moments and staying safe
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">What is a Safety Plan?</h3>
                <p className="text-sm text-purple-800">
                  A safety plan is a personalized, practical plan to help you recognize warning signs and use coping strategies when you're in distress. It can help you stay safe during difficult times.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Emergency Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <Card className="p-6 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <Phone className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-3">Crisis Resources - Available 24/7</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="tel:988" className="flex items-center gap-2 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                    <Phone className="w-4 h-4" />
                    <div>
                      <div className="font-semibold">988 Suicide & Crisis Lifeline</div>
                      <div className="text-sm text-white/90">Call or Text 988</div>
                    </div>
                  </a>
                  <a href="tel:911" className="flex items-center gap-2 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
                    <Phone className="w-4 h-4" />
                    <div>
                      <div className="font-semibold">Emergency Services</div>
                      <div className="text-sm text-white/90">Call 911</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Safety Plan Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{section.title}</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                            {itemIndex + 1}
                          </div>
                          <p className="text-sm">{item}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteItem(section.id, itemIndex)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {editingSection === section.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddItem(section.id, newItem)}
                        placeholder={section.placeholder}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                      <Button onClick={() => handleAddItem(section.id, newItem)}>
                        Add
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEditingSection(null);
                          setNewItem("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setEditingSection(section.id)}
                      className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </motion.button>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Export/Print */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">Keep Your Safety Plan Accessible</h3>
                <p className="text-sm text-muted-foreground">
                  Print or save a copy so you can access it when you need it most
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.print()}>
                  Print Plan
                </Button>
                <Button onClick={handleDownloadPDF}>
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}