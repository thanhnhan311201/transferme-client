import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../authentication/slice/authSlice";
import { useState } from "react";

import Header from "../components/Header";
import ListDevice from "../components/ListDevice";
import TransferForm from "../components/TransferForm";
import UserNav from "../components/UserNav";

import { type RootState } from "../../../states";
import { type IUserInfo } from "../../../config";

const Transfer: React.FC = () => {
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
    dispatch(authActions.setUnauthenticated());
  };

  return (
    <div className="bg-main-bg h-screen">
      <div className="h-full grid grid-cols-2-for-transferLayout grid-rows-2-for-transferLayout">
        <Header
          showUserNav={showUserNav}
          onHandleShowUserNav={handleShowUserNav}
          userInfo={userInfo}
        />
        {showUserNav && <UserNav onLogout={handleLogout} userInfo={userInfo} />}
        <ListDevice />
        <TransferForm />
      </div>
    </div>
  );
};

export default Transfer;
