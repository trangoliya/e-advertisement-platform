import { motion } from "framer-motion";

const MotionSection = motion.section;
const MotionDiv = motion.div;

function PublicPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-indigo-600">
            E-Advertisement Platform
          </h1>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#overview" className="hover:text-indigo-600">
              Overview
            </a>
            <a href="#roles" className="hover:text-indigo-600">
              User Roles
            </a>
            <a href="#features" className="hover:text-indigo-600">
              Features
            </a>
            <a href="#workflow" className="hover:text-indigo-600">
              Workflow
            </a>
          </nav>

          <div className="flex gap-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm border rounded hover:bg-slate-100"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <MotionSection
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 py-24 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          Smart Digital Advertising Platform
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto mb-8">
          A comprehensive e-advertisement system that enables businesses to
          design, target, distribute, and analyze digital advertisements
          efficiently for higher engagement and improved ROI.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Campaign
          </a>
          <a
            href="/login"
            className="px-6 py-3 border rounded-lg hover:bg-slate-100"
          >
            Sign In
          </a>
        </div>
      </MotionSection>

      {/* ================= OVERVIEW ================= */}
      <section id="overview" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Platform Overview</h2>
          <p className="text-slate-600 mb-4">
            The E-Advertisement Platform is designed to simplify the process of
            creating and managing online advertising campaigns. It provides a
            centralized environment where advertisers can plan, execute, and
            monitor campaigns across multiple digital channels.
          </p>
          <p className="text-slate-600">
            By leveraging real-time analytics, audience targeting, and cost
            control mechanisms, the platform helps businesses achieve better
            engagement, optimized spending, and measurable outcomes.
          </p>
        </div>
      </section>

      {/* ================= USER ROLES ================= */}
      <section id="roles" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">User Roles</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-100 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Admin</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Manage users and campaigns</li>
                <li>• Monitor ad content compliance</li>
                <li>• Analyze platform-wide confirmed insights</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-100 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Advertiser</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Create and manage ad campaigns</li>
                <li>• Define target audience parameters</li>
                <li>• Monitor and optimize ad performance</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-100 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Viewer</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• View and interact with advertisements</li>
                <li>• Provide feedback through surveys</li>
                <li>• Engage with promoted content</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Core Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Drag-and-drop ad builder with multimedia support",
              "Advanced targeting by location, demographics, and interests",
              "Real-time analytics for impressions, clicks, and conversions",
              "Budget management with bidding and spending controls",
              "Multi-channel ad distribution (Google, Meta, LinkedIn, etc.)",
              "Ad retargeting using cookies and tracking pixels",
            ].map((feature, i) => (
              <MotionDiv
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white rounded-xl shadow"
              >
                <p className="text-slate-700">• {feature}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section id="workflow" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">System Workflow</h2>

          <ol className="space-y-4 text-slate-600 list-decimal list-inside">
            <li>
              Advertisers create accounts and design advertisement campaigns.
            </li>
            <li>Target audience and campaign objectives are defined.</li>
            <li>Advertisements are distributed across selected platforms.</li>
            <li>The system tracks performance in real time.</li>
            <li>Campaigns are optimized based on analytics and feedback.</li>
          </ol>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-10 text-center text-sm text-slate-500">
        © 2026 E-Advertisement Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default PublicPage;
