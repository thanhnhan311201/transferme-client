import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../../images/logo_4.png";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="flex justify-between items-center bg-inherit py-4 px-24"
    >
      <Link to="/" className="w-48">
        <img className="w-full" src={logo} alt="TransferMe Logo" />
      </Link>
      <nav className="flex items-center gap-8">
        <Link
          className="text-primary-color inline-block text-xl px-4 py-1 rounded-3xl bg-transparent hover:bg-white"
          to="/auth/login"
        >
          Sign in
        </Link>
        <Link
          className="text-primary-color inline-block text-xl px-4 py-1 rounded-3xl border-2 border-solid border-primary-color bg-transparent hover:bg-white"
          to="/auth/signup"
        >
          Join now
        </Link>
      </nav>
    </motion.div>
  );
};

export default Header;
