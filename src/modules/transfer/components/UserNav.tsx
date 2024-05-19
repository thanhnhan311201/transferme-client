import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import { MdLogout, MdOutlineDevices } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BsCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

import { type IUserInfo } from "@/config";

const UserNav = React.forwardRef<
  HTMLDivElement,
  {
    onLogout: () => void;
    userInfo: IUserInfo;
    clientId: string;
    onlineUsers: { id: string; clientId: string; profilePhoto: string, username: string, email: string }[];
  }
>((props, ref) => {
  return (
    <motion.div
      key="user_nav"
      ref={ref}
      initial={{ opacity: 0, x: 125, y: -100, scale: 0 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 125, y: -100, scale: 0 }}
      className="bg-modal-user w-88 shadow-user-nav p-2 rounded-3xl absolute top-16 right-4 z-50"
    >
      <div className="bg-white w-full p-4 rounded-3xl mb-2">
        <div className="flex gap-4 items-center">
          <div className="w-14">
            <img
              className="rounded-full w-full"
              src={props.userInfo.profilePhoto}
              alt="User avatar"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </div>
          <div className="grow">
            <div className="text-3c4043 font-medium text-sm">
              {props.userInfo.username}
            </div>
            <div className="text-5f6368 text-xs truncate">
              {props.userInfo.email}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col border-b border-solid border-gray-200">
          <div className="w-full px-4 py-2 flex gap-4 items-center">
            <div className="w-14 flex justify-center">
              <IconContext.Provider
                value={{
                  style: {
                    width: "1.5rem",
                    height: "1.5rem",
                  },
                }}
              >
                <HiOutlineStatusOnline />
              </IconContext.Provider>
            </div>
            <div className="grow">
              <span className="text-46ab5e font-medium text-base">
                {props.clientId}
              </span>
            </div>
          </div>
          <div className="w-full p-4 py-2 flex gap-4 items-center">
            <div className="w-14 flex justify-center self-start">
              <IconContext.Provider
                value={{
                  style: {
                    width: "1.5rem",
                    height: "1.5rem",
                  },
                }}
              >
                <MdOutlineDevices />
              </IconContext.Provider>
            </div>
            <div className="grow flex flex-col gap-1">
              <span className="text-3c4043 font-medium text-base">
                Online Devices
              </span>
              <div>
                <AnimatePresence>
                  {props.onlineUsers.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm"
                    >
                      No device found
                    </motion.p>
                  ) : (
                    <ul className="flex flex-col">
                      {props.onlineUsers.map((user) => (
                        <motion.li
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          key={user.id}
                        >
                          <div className="flex items-center gap-3">
                            <IconContext.Provider
                              value={{
                                style: {
                                  width: ".75rem",
                                  height: ".75rem",
                                  color: "#46ab5e",
                                  borderRadius: "50%",
                                },
                              }}
                            >
                              <BsCircleFill />
                            </IconContext.Provider>
                            <div className="grow text-3c4043 font-normal text-sm py-1 truncate">
                              <span>{user.clientId}</span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={props.onLogout}
          className="w-full p-4 hover:bg-e0e9f8 rounded-3xl cursor-pointer flex gap-4 items-center"
        >
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
