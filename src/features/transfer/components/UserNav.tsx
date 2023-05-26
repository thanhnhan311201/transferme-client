import React from "react";
import { motion } from "framer-motion";

import { MdLogout } from "react-icons/md";
import { IconContext } from "react-icons";

import { type IUserInfo } from "../../../config";

const UserNav = React.forwardRef<
  HTMLDivElement,
  { onLogout: () => void; userInfo: IUserInfo }
>((props, ref) => {
  return (
    <motion.div
      key="user_nav"
      ref={ref}
      initial={{ opacity: 0, y: -50, scale: 0.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.1 }}
      className="bg-modal-user w-96 shadow-user-nav p-2 rounded-3xl absolute top-16 right-4 z-50"
    >
      <div className="bg-white w-full p-4 rounded-3xl mb-2">
        <div className="flex gap-4 items-center">
          <div className="w-14">
            <img
              className="rounded-full w-full"
              src={props.userInfo.picture}
              alt="User avatar"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </div>
          <div className="grow">
            <div className="text-3c4043 font-medium text-sm">
              {props.userInfo.name}
            </div>
            <div className="text-5f6368 text-xs">{props.userInfo.email}</div>
          </div>
        </div>
      </div>
      <div
        onClick={props.onLogout}
        className="w-full p-4 hover:bg-e0e9f8 rounded-3xl cursor-pointer"
      >
        <div className="flex gap-4 items-center">
          <div className="w-14 flex justify-center">
            <IconContext.Provider
              value={{
                style: {
                  width: "1.5rem",
                  height: "1.5rem",
                },
              }}
            >
              <MdLogout />
            </IconContext.Provider>
          </div>
          <div className="grow">
            <span className="text-3c4043 font-medium text-base">Log out</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default UserNav;
