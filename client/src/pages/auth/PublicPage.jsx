import { motion } from "framer-motion";

import {
  FiBarChart2,
  FiUsers,
  FiTarget,
  FiActivity,
  FiTrendingUp,
  FiShield,
  FiMonitor,
  FiArrowRight,
} from "react-icons/fi";

const MotionSection = motion.section;
const MotionDiv = motion.div;

function PublicPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <FiBarChart2 size={20} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                E-Advertisement Platform
              </h1>

              <p className="text-xs text-gray-500">Smart Digital Advertising</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#overview"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Overview
            </a>

            <a
              href="#roles"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              User Roles
            </a>

            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Workflow
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition"
            >
              Login
            </a>

            <a
              href="/register"
              className="px-5 py-2 text-sm bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-125 w-125 rounded-full bg-indigo-100 blur-3xl opacity-50" />
        <div className="absolute right-0 top-20 h-75 w-75 rounded-full bg-purple-100 blur-3xl opacity-40" />
      </div>
      {/* ================= HERO ================= */}
      <MotionSection
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 py-32 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-medium mb-8">
          <FiTrendingUp size={16} />
          Modern Advertising Management Platform
        </div>

        {/* Title */}
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Next-Generation
          </span>
          <br />
          Digital Advertising Platform
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
          Create, manage and analyze advertising campaigns through a unified
          platform. Reach the right audience, track engagement and maximize
          campaign performance with real-time insights.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/register"
            className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
          >
            Get Started
            <FiArrowRight size={18} />
          </a>

          <a
            href="/login"
            className="px-8 py-4 border border-gray-300 bg-white rounded-xl hover:bg-gray-50 transition"
          >
            Sign In
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-3xl font-bold text-indigo-600">Real-Time</h3>

            <p className="text-gray-500 mt-2">Analytics Dashboard</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-3xl font-bold text-green-600">Smart</h3>

            <p className="text-gray-500 mt-2">Audience Targeting</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-3xl font-bold text-purple-600">Secure</h3>

            <p className="text-gray-500 mt-2">Role-Based Access</p>
          </div>
        </div>
      </MotionSection>

      {/* ================= OVERVIEW ================= */}
      <section
        id="overview"
        className="py-24 bg-linear-to-b from-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="text-indigo-600 font-semibold tracking-wide uppercase">
              Platform Overview
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              Everything You Need to Manage
              <br />
              Digital Advertising
            </h2>

            <p className="max-w-3xl mx-auto mt-5 text-slate-600 text-lg">
              A centralized platform for creating, managing and analyzing
              digital advertisement campaigns with audience targeting,
              performance tracking and real-time insights.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <MotionDiv
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <FiTarget size={26} />
              </div>

              <h3 className="text-xl font-semibold mb-3">Smart Targeting</h3>

              <p className="text-slate-600">
                Reach the right audience using interests, demographics and user
                preferences collected through the platform.
              </p>
            </MotionDiv>

            <MotionDiv
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-5">
                <FiActivity size={26} />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Real-Time Analytics
              </h3>

              <p className="text-slate-600">
                Monitor impressions, clicks and campaign performance through
                interactive dashboards and analytics tools.
              </p>
            </MotionDiv>

            <MotionDiv
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-5">
                <FiShield size={26} />
              </div>

              <h3 className="text-xl font-semibold mb-3">Secure Management</h3>

              <p className="text-slate-600">
                Role-based access control for Admins, Publishers and Viewers
                with secure authentication and authorization.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* ================= USER ROLES ================= */}
      <section id="roles" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="text-indigo-600 font-semibold uppercase tracking-wide">
              User Roles
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              Designed For Every User
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto mt-4">
              The platform provides dedicated dashboards and functionality for
              Administrators, Publishers and Viewers.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Admin */}
            <MotionDiv
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 mb-5">
                <FiShield size={26} />
              </div>

              <h3 className="text-xl font-semibold mb-4">Admin</h3>

              <ul className="text-slate-600 space-y-3">
                <li>✓ Manage users and campaigns</li>
                <li>✓ Approve and monitor advertisements</li>
                <li>✓ View platform-wide analytics</li>
                <li>✓ Maintain system integrity</li>
              </ul>
            </MotionDiv>

            {/* Publisher */}
            <MotionDiv
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <FiMonitor size={26} />
              </div>

              <h3 className="text-xl font-semibold mb-4">Publisher</h3>

              <ul className="text-slate-600 space-y-3">
                <li>✓ Create advertisement campaigns</li>
                <li>✓ Manage advertisements</li>
                <li>✓ Monitor impressions and clicks</li>
                <li>✓ Track campaign performance</li>
              </ul>
            </MotionDiv>

            {/* Viewer */}
            <MotionDiv
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-5">
                <FiUsers size={26} />
              </div>

              <h3 className="text-xl font-semibold mb-4">Viewer</h3>

              <ul className="text-slate-600 space-y-3">
                <li>✓ View personalized advertisements</li>
                <li>✓ Interact with campaigns</li>
                <li>✓ Provide profile preferences</li>
                <li>✓ Improve targeting accuracy</li>
              </ul>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="py-24 bg-linear-to-b from-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="text-indigo-600 font-semibold uppercase tracking-wide">
              Core Features
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              Powerful Features For Modern Advertising
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto mt-4">
              Everything required to create, manage and monitor digital
              advertising campaigns from a single platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FiShield size={24} />,
                title: "Role-Based Access",
                desc: "Secure authentication and authorization for Admin, Publisher and Viewer.",
              },
              {
                icon: <FiMonitor size={24} />,
                title: "Ad Management",
                desc: "Create, edit and manage advertisement campaigns efficiently.",
              },
              {
                icon: <FiTarget size={24} />,
                title: "Audience Targeting",
                desc: "Deliver advertisements based on viewer interests and profiles.",
              },
              {
                icon: <FiActivity size={24} />,
                title: "Real-Time Analytics",
                desc: "Track impressions, clicks and campaign engagement instantly.",
              },
              {
                icon: <FiUsers size={24} />,
                title: "Viewer Profiles",
                desc: "Collect preferences and improve personalization accuracy.",
              },
              {
                icon: <FiBarChart2 size={24} />,
                title: "Performance Tracking",
                desc: "Measure campaign effectiveness through detailed dashboards.",
              },
              {
                icon: <FiTrendingUp size={24} />,
                title: "Campaign Insights",
                desc: "Analyze trends and optimize advertisement performance.",
              },
              {
                icon: <FiMonitor size={24} />,
                title: "Responsive Dashboard",
                desc: "Modern UI designed for desktop, tablet and mobile devices.",
              },
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                whileHover={{ y: -5 }}
               className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section id="workflow" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="text-indigo-600 font-semibold uppercase tracking-wide">
              System Workflow
            </span>

            <h2 className="text-4xl font-bold text-gray-900 mt-3">
              How The Platform Works
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto mt-4">
              A streamlined workflow that connects Publishers, Viewers and
              Administrators for efficient campaign management.
            </p>
          </div>

          {/* Timeline */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Register",
                desc: "Publishers and viewers create accounts and access the platform.",
              },
              {
                step: "02",
                title: "Create Campaign",
                desc: "Publishers create advertisements and define campaign details.",
              },
              {
                step: "03",
                title: "Target Audience",
                desc: "Advertisements are matched with viewers based on interests.",
              },
              {
                step: "04",
                title: "Track Performance",
                desc: "The system records impressions, clicks and engagement.",
              },
              {
                step: "05",
                title: "Analyze Results",
                desc: "Publishers and admins review analytics and optimize campaigns.",
              },
            ].map((item, index) => (
              <MotionDiv
                key={index}
                whileHover={{ y: -5 }}
                className="relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold mb-5">
                  {item.step}
                </div>

                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <FiBarChart2 size={20} />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  E-Advertisement Platform
                </h3>

                <p className="text-sm text-slate-500">
                  Smart Digital Advertising Solution
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#overview"
                className="text-slate-500 hover:text-indigo-600 transition"
              >
                Overview
              </a>

              <a
                href="#roles"
                className="text-slate-500 hover:text-indigo-600 transition"
              >
                Roles
              </a>

              <a
                href="#features"
                className="text-slate-500 hover:text-indigo-600 transition"
              >
                Features
              </a>

              <a
                href="#workflow"
                className="text-slate-500 hover:text-indigo-600 transition"
              >
                Workflow
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-100 mt-8 pt-6 text-center text-sm text-slate-500">
            © 2026 E-Advertisement Platform | Developed using MERN Stack
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicPage;
