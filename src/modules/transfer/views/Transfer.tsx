import { useState, useCallback } from "react";
import socketClient from "@/socket";

import { AnimatePresence, motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/store";
import useOutsideRef from "../hooks/useOutsideRef";
import { setUnauthenticated } from "@/modules/authentication/controller/auth.slice";

import Header from "../components/Header";
import TransferForm from "../components/TransferForm";
import UserNav from "../components/UserNav";
import ReceivingWindow from "../components/ReceivingWindow";

import { SOCKET_EVENTS } from "@/socket/config.socket";
import { removeCredentialToken } from "@/modules/authentication/utils";
import AuthAPI from "@/modules/authentication/controller/auth.service";

const Transfer: React.FC = () => {
  const { onlineUsers } = useAppSelector((state) => state.socket);
  const { userInfo } = useAppSelector((state) => state.auth);
  const { transferStatus } = useAppSelector((state) => state.transfer);

  const dispatch = useAppDispatch();

  const [showUserNav, setShowUserNav] = useState<boolean>(false);

  const [userNavRef, userHeaderRef] = useOutsideRef(() => {
    setShowUserNav(false);
  });

  const handleShowUserNav = useCallback(() => {
    setShowUserNav((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    await AuthAPI.signout();
    removeCredentialToken();
    socketClient.disconnect();
    dispatch(setUnauthenticated());
  }, [dispatch]);

  return (
    <div>
      <AnimatePresence>
        {transferStatus !== SOCKET_EVENTS.AVAILABLE &&
          transferStatus !== SOCKET_EVENTS.REFUSE_REQUEST && (
            <ReceivingWindow />
          )}
      </AnimatePresence>
      <div className="bg-fafafa h-screen">
        <div className="h-full flex flex-col items-center">
          {/* <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-7xl w-full mx-auto my-0 relative"
          >
            <Header
              ref={userHeaderRef}
              showUserNav={showUserNav}
              onHandleShowUserNav={handleShowUserNav}
              userInfo={userInfo}
              clientId={socketClient.clientId}
            />
            <AnimatePresence>
              {showUserNav && (
                <UserNav
                  ref={userNavRef}
                  key="modal"
                  onLogout={handleLogout}
                  userInfo={userInfo}
                  clientId={socketClient.clientId}
                  onlineUsers={onlineUsers}
                />
              )}
            </AnimatePresence>
          </motion.div> */}
          <TransferForm />
        </div>
      </div>
    </div>
  );
};

export default Transfer;
