import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import useOutsideRef from "../hooks/useOutsideRef";

import Header from "../components/Header";
import ListUser from "../components/ListUser";
import TransferForm from "../components/TransferForm";
import UserNav from "../components/UserNav";
import Navigation from "../components/Navigation";

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
    console.log("outside");
    setShowUserNav(false);
  });

  const handleShowUserNav = useCallback(() => {
    setShowUserNav((prev) => !prev);
  }, []);

  const handleLogout = () => {
    document.cookie = `access_token= ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;
    document.cookie = `user_id= ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;

    socketClient.disconnect();
    dispatch(authActions.setUnauthenticated());
  };

  return (
    <div className="bg-main-bg h-screen">
      <div className="h-full grid grid-cols-3-for-transferLayout grid-rows-2-for-transferLayout">
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
            />
          )}
        </AnimatePresence>
        <Navigation />
        <TransferForm />
        <ListUser onlineUsers={onlineUsers} />
      </div>
    </div>
  );
};

export default Transfer;
