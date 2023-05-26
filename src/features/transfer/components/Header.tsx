import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

import logo from "../../../images/logo_4.png";
import { type IUserInfo } from "../../../config";

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
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="w-screen col-span-full"
    >
      <div className="w-full grid grid-cols-3-for-transferLayout items-center">
        <div className="py-4 px-2">
          <div className="w-36 pl-5 ">
            <Link to="/transfer" className="w-full">
              <img className="w-full" src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="flex justify-start items-center gap-4">
          <IconContext.Provider
            value={{
              style: {
                color: "#46ab5e",
                width: "1.5rem",
                height: "1.5rem",
              },
            }}
          >
            <HiOutlineStatusOnline />
          </IconContext.Provider>
          <span className="text-46ab5e font-medium text-base">
            {props.clientId}
          </span>
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
                props.showUserNav ? "border-e0e9f8" : "border-main-bg"
              }`}
            >
              <img
                className="rounded-full w-full z-0"
                src={props.userInfo.picture}
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
    </motion.div>
  );
});

export default Header;
