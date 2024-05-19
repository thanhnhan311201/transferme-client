import React from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";

import { type IUserInfo } from "@/config";

import logo from "/images/logo_4.png";

const scaleVariants = {
  normal: { scale: 1 },
  init: { scale: 0.8 },
  tapped: { scale: 1.2 },
};

const Header = React.forwardRef<
  HTMLDivElement,
  {
    userInfo: IUserInfo;
    showUserNav: boolean;
    onHandleShowUserNav: () => void;
    clientId: string;
  }
>((props, ref) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="py-4 px-2">
        <div className="h-6 pl-5 ">
          <Link to="/transfer" className="h-full">
            <img className="h-full" src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-full border-4 border-solid border-transparent cursor-pointer hover:border-e0e9f8">
          <IconContext.Provider
            value={{
              style: {
                width: "2rem",
                height: "2rem",
                color: "#555",
              },
            }}
          >
            <IoIosHelpCircleOutline />
          </IconContext.Provider>
        </div>
        <div className="flex justify-end items-center py-2 mr-4 cursor-pointer">
          <motion.div
            variants={scaleVariants}
            whileTap="tapped"
            animate="normal"
            initial="init"
          >
            <div
              ref={ref}
              onClick={props.onHandleShowUserNav}
              className={`w-11 rounded-full border-4 hover:border-e0e9f8 border-solid relative ${
                props.showUserNav ? "border-e0e9f8" : "border-fafafa"
              }`}
            >
              <img
                className="rounded-full w-full z-0"
                src={props.userInfo.profilePhoto}
                alt="User avatar"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <IconContext.Provider
                value={{
                  style: {
                    position: "absolute",
                    width: "1rem",
                    height: "1rem",
                    bottom: -2,
                    right: -2,
                    backgroundColor: "#e0e9f8",
                    color: "#000",
                    zIndex: 100,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  },
                }}
              >
                <IoIosArrowDown />
              </IconContext.Provider>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default Header;
