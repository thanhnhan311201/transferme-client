import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../images/logo_2.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-inherit h-24 px-12">
      <Link to="/" className="w-48">
        <img className="w-full" src={logo} alt="TransferMe Logo" />
      </Link>
      <nav>
        <Link
          className="text-white font-medium text-lg px-6 py-3 rounded-lg bg-primary-color hover:bg-primary-color--shade"
          to="/auth/login"
        >
          Transfer now
        </Link>
      </nav>
    </header>
  );
};

export default Header;
