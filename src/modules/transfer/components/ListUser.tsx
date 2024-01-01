import React from "react";
import { IconContext } from "react-icons";

import { motion, AnimatePresence } from "framer-motion";

import { BsCircleFill } from "react-icons/bs";

import { IUserInfo } from "@/config";

const ListUser: React.FC<{
  onlineUsers: { id: string; clientId: string; picture: string }[];
}> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75 }}
      className="overflow-hidden p-4 pt-0"
    >
      <div className="w-full rounded-xl p-4">
        <div className="flex flex-col w-full gap-3">
          <span className="text-3c4043 font-medium text-lg">Devices</span>
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
                <ul className="flex flex-col gap-2">
                  {props.onlineUsers.map((user) => (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      key={user.id}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 relative">
                          <img
                            className="rounded-full w-full z-0"
                            src={user.picture}
                            alt="User avatar"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                          />
                          <IconContext.Provider
                            value={{
                              style: {
                                position: "absolute",
                                width: "0.75rem",
                                height: "0.75rem",
                                color: "#46ab5e",
                                bottom: -2,
                                right: -2,
                                zIndex: 2,
                                border: "2px solid #fff",
                                borderRadius: "50%",
                              },
                            }}
                          >
                            <BsCircleFill />
                          </IconContext.Provider>
                        </div>
                        <div className="text-3c4043 font-medium text-sm py-2 truncate">
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
    </motion.div>
  );
};

export default ListUser;
