import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../images/logo_3.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-inherit py-4 px-24">
      <Link to="/" className="w-48">
        <img className="w-full" src={logo} alt="TransferMe Logo" />
      </Link>
      <nav className="flex items-center gap-8">
        <Link
          className="text-primary-color inline-block text-lg px-4 py-1 rounded-3xl bg-white hover:bg-primary-color--tint"
          to="/auth/login"
        >
          Sign in
        </Link>
        <Link
          className="text-primary-color inline-block text-lg px-4 py-1 rounded-3xl border-2 border-solid border-primary-color bg-white hover:bg-primary-color--tint"
          to="/auth/signup"
        >
          Join now
        </Link>
      </nav>
    </header>
  );
};

export default Header;
