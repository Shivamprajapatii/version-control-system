import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center  text-black px-6 border rounded-4xl black py-4 shadow-lg"
    >
     
      <Link to={"/"}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="src/assets/Logo.png"
            alt="github logo"
            className="w-10 h-10"
          />
          <h3 className="text-xl font-semibold">Version Control</h3>
        </motion.div>
      </Link>

      
      <div className="flex gap-6">
        <Link to={"/create"}>
          <motion.p
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            className="cursor-pointer transition-colors duration-300"
          >
            + Create Repo
          </motion.p>
        </Link>

        <Link to={"/profile"}>
          <motion.p
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            className="cursor-pointer transition-colors duration-300"
          >
            Profile
          </motion.p>
        </Link>
        <motion.div   whileHover={{ scale: 1.1, color: "#3b82f6" }}
            className="cursor-pointer transition-colors duration-300"
        >
            <h1><button className="cursor-pointer transition-colors duration-300" onClick={()=> {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");

                location.reload("/auth");
            }}>Logout</button></h1>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
