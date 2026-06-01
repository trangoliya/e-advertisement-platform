import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiHome, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  const MotionDiv = motion.div;
  const MotionH1 = motion.h1;
  const MotionH2 = motion.h2;
  const MotionP = motion.p;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* Animated Icon */}
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
          }}
          className="flex justify-center"
        >
          <div className="h-28 w-28 rounded-full bg-indigo-100 flex items-center justify-center">
            <MotionDiv
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <FiAlertTriangle className="text-5xl text-indigo-600" />
            </MotionDiv>
          </div>
        </MotionDiv>

        {/* 404 */}
        <MotionH1     
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-7xl md:text-8xl font-extrabold text-gray-900"
        >
          404
        </MotionH1>

        {/* Title */}
        <MotionH2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-3xl font-bold text-gray-900"
        >
          Oops! Page Not Found
        </MotionH2>

        {/* Description */}
        <MotionP    
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-gray-500 max-w-lg mx-auto"
        >
          The page you are looking for might have been removed, renamed, or is
          temporarily unavailable.
        </MotionP>

        {/* Buttons */}
        <MotionDiv
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <FiArrowLeft />
            Go Back
          </button>

          <Link
            to="/home"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 transition"
          >
            <FiHome />
            Back To Home
          </Link>
        </MotionDiv>

        {/* Floating Text */}
        <MotionDiv
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="mt-12 text-sm text-gray-400"
        >
          E-Advertisement Platform
        </MotionDiv >
      </div>
    </div>
  );
};

export default NotFound;
