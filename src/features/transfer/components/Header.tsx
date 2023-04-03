import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../images/logo.png";
import { type IUserInfo } from "../../../config";

const Header: React.FC<{
  userInfo: IUserInfo;
  showUserNav: boolean;
  onHandleShowUserNav: () => void;
}> = (props) => {
  return (
    <div className="w-screen col-span-full">
      <div className="w-full flex py-2 px-4 justify-between items-center">
        <Link to="/transfer" className="w-48">
          <img className="w-full" src={logo} alt="logo" />
        </Link>
        <div
          onClick={props.onHandleShowUserNav}
          className={`w-11 rounded-full border-4 hover:border-e0e9f8 border-solid ${
            props.showUserNav ? "border-e0e9f8" : "border-main-bg"
          }`}
        >
          <img
            className="rounded-full w-full"
            src={props.userInfo.picture}
            alt="User avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
