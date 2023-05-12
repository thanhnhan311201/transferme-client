import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

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

  const handleShowUserNav = () => {
    setShowUserNav((prev) => !prev);
  };

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
          showUserNav={showUserNav}
          onHandleShowUserNav={handleShowUserNav}
          userInfo={userInfo}
        />
        <AnimatePresence>
          {showUserNav && (
            <UserNav key="modal" onLogout={handleLogout} userInfo={userInfo} />
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
