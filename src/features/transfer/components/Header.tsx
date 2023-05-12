import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

import logo from "../../../images/logo.png";
import { type IUserInfo } from "../../../config";

const scaleVariants = {
  normal: { scale: 1 },
  init: { scale: 0.8 },
  tapped: { scale: 1.2 },
};

const Header: React.FC<{
  userInfo: IUserInfo;
  showUserNav: boolean;
  onHandleShowUserNav: () => void;
}> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="w-screen col-span-full"
    >
      <div className="w-full grid grid-cols-2-for-header items-center">
        <div className="py-4 px-2">
          <div className="w-36 pl-5 ">
            <Link to="/transfer" className="w-full">
              <img className="w-full" src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="flex justify-end items-center gap-8 py-2">
          <div className="px-4 py-2 hover:bg-edf2fc rounded-3xl cursor-pointer">
            <span className="uppercase text-blue-700 font-bold text-lg">
              HOW TO USE
            </span>
          </div>
          <motion.div
            variants={scaleVariants}
            whileTap="tapped"
            animate="normal"
            initial="init"
            className="justify-self-end mr-4 cursor-pointer"
          >
            <div
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
};

export default Header;
