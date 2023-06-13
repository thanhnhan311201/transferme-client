import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import useOutsideRef from "../hooks/useOutsideRef";

import Header from "../components/Header";
import TransferForm from "../components/TransferForm";
import UserNav from "../components/UserNav";

import { authActions } from "../../authentication/slice/authSlice";

import socketClient from "../../../socket";

import { type RootState } from "../../../states";
import { type IUserInfo } from "../../../config";

const Transfer: React.FC = () => {
  const onlineUsers = useSelector(
    (state: RootState) => state.socket.onlineUsers
  );

  const dispatch = useDispatch();
  const userInfo: IUserInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  const [showUserNav, setShowUserNav] = useState<boolean>(false);

  const [userNavRef, userHeaderRef] = useOutsideRef(() => {
    setShowUserNav(false);
  });

  const handleShowUserNav = useCallback(() => {
    setShowUserNav((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    document.cookie = `access_token= ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;
    document.cookie = `user_id= ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;

    socketClient.disconnect();
    dispatch(authActions.setUnauthenticated());
  }, [dispatch]);

  return (
    <div className="bg-fafafa h-screen">
      <div className="h-full flex flex-col items-center">
        <motion.div
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
        </motion.div>
        <TransferForm />
      </div>
    </div>
  );
};

export default Transfer;
