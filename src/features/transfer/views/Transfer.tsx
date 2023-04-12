import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import ListDevice from "../components/ListDevice";
import TransferForm from "../components/TransferForm";
import UserNav from "../components/UserNav";
import Navigation from "../components/Navigation";
import { authActions } from "../../authentication/slice/authSlice";
import { socketActions } from "../slice/socketSlice";

import { type RootState } from "../../../states";
import { type IUserInfo } from "../../../config";

const devices: { picture: string; socketId: string }[] = [
  {
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZr85zIpU9L1nQONTk257M85ORkfXiElAYcbyST=s96-c",
    socketId: "jdlkqwd!@3fjlk_401d",
  },
  {
    picture:
      "https://lh3.googleusercontent.com/a/AGNmyxZr85zIpU9L1nQONTk257M85ORkfXiElAYcbyST=s96-c",
    socketId: "jdlkqwd!@3fjlk_458d",
  },
];

const Transfer: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo: IUserInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  );
  // const socketId: string = useSelector(
  //   (state: RootState) => state.socket.socketId
  // );
  const socketId: string = `jdlkqwd!@3fjlk_434d`;

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

    dispatch(socketActions.disconnect());
    dispatch(authActions.setUnauthenticated());
  };

  return (
    <div className="bg-main-bg h-screen">
      <div className="h-full grid grid-cols-3-for-transferLayout grid-rows-2-for-transferLayout">
        <Header
          socketId={socketId}
          showUserNav={showUserNav}
          onHandleShowUserNav={handleShowUserNav}
          userInfo={userInfo}
        />
        {showUserNav && (
          <AnimatePresence>
            <UserNav key="modal" onLogout={handleLogout} userInfo={userInfo} />
          </AnimatePresence>
        )}
        <Navigation />
        <TransferForm />
        <ListDevice devices={devices} />
      </div>
    </div>
  );
};

export default Transfer;
