import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import ListDevice from "../components/ListDevice";
import TransferForm from "../components/TransferForm";
import UserNav from "../components/UserNav";
import Navigation from "../components/Navigation";
import { authActions } from "../../authentication/slice/authSlice";

import socketClient from "../../../socket";

import { type RootState } from "../../../states";
import { type IUserInfo } from "../../../config";

const Transfer: React.FC = () => {
  const devices = useSelector((state: RootState) => state.socket.devices);

  const dispatch = useDispatch();
  const userInfo: IUserInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  );

  const [showUserNav, setShowUserNav] = useState<boolean>(false);

  const handleShowUserNav = () => {
    setShowUserNav((prev) => !prev);
  };

  const handleLogout = () => {
    document.cookie = `accessToken= ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;
    document.cookie = `userId= ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;

    socketClient.disconnect();
    dispatch(authActions.setUnauthenticated());
  };

  return (
    <div className="bg-main-bg h-screen">
      <div className="h-full grid grid-cols-3-for-transferLayout grid-rows-2-for-transferLayout">
        <Header
          socketId={socketClient.getSocketName()}
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
        <ListDevice devices={devices} deviceAvatar={userInfo.picture} />
      </div>
    </div>
  );
};

export default Transfer;
