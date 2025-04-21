import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center text-white px-8 py-4 mx-4 mt-1 rounded-2xl shadow-xl"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      {/* Logo Section */}
      <Link to={"/"}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <motion.img
            src="src/assets/Logo.png"
            alt="github logo"
            className="w-12 h-12 rounded-full border-2 border-white/30 shadow-md"
            whileHover={{ rotate: 10 }}
          />
          <motion.h3 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Version Control
          </motion.h3>
        </motion.div>
      </Link>

      {/* Navigation Links */}
      <motion.div 
        className="flex items-center gap-8 ml-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link to={"/"}>
          <motion.p
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgba(59, 130, 246, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer font-medium text-black/90 hover:text-white transition-all"
          >
            Dashboard
          </motion.p>
        </Link>

        <Link to={"/repositories"}>
          <motion.p
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgba(59, 130, 246, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer font-medium text-black/90 hover:text-white transition-all"
          >
            Repositories
          </motion.p>
        </Link>

        <Link to={"/create"}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-md"
          >
            <p className="font-semibold text-white">+ Create Repo</p>
          </motion.div>
        </Link>

        <Link to={"/profile"}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden shadow-md"
          >
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Link>

        <motion.button
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(239, 68, 68, 0.8)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "/auth";
          }}
          className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 font-medium text-black/90 hover:text-white transition-all"
        >
          Logout
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;