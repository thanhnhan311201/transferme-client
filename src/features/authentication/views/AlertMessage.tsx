import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { RootState } from "../../../states";
import { signupActions } from "../slice/signupSlice";
import { loginActions } from "../slice/loginSlice";

import { SIGNUP_STATUS } from "../slice/signupSlice";
import { LOGIN_STATUS } from "../slice/loginSlice";

import { SignupSuccess } from "../components/AlertMessage";
import { SignupFail } from "../components/AlertMessage";
import { LoginFail } from "../components/AlertMessage";
import { LoginSuccess } from "../components/AlertMessage";

const AlertMessage: React.FC = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    (state: RootState) => state.login.loginStatus
  );
  const signupStatus = useSelector(
    (state: RootState) => state.signup.signupStatus
  );

  const navigate = useNavigate();

  const handleNavigateLoginPage = () => {
    navigate("/auth/login");
  };

  const handleCloseSignupAlert = () => {
    dispatch(signupActions.setNotSignup());
  };

  const handleCloseLoginAlert = () => {
    dispatch(loginActions.setNotLogin());
  };

  return (
    <>
      {signupStatus !== SIGNUP_STATUS.NOT_SIGNUP && (
        <>
          {signupStatus === SIGNUP_STATUS.SIGNUP_SUCCESS && (
            <motion.div
              key="signup_success_alert"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute right-4 top-0 max-w-25"
            >
              <SignupSuccess
                onClose={handleCloseSignupAlert}
                onNavigateLoginPage={handleNavigateLoginPage}
              />
            </motion.div>
          )}
          {signupStatus === SIGNUP_STATUS.SIGNUP_FAIL && (
            <motion.div
              key="signup_fail_alert"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute right-4 top-0 max-w-25"
            >
              <SignupFail onClose={handleCloseSignupAlert} />
            </motion.div>
          )}
        </>
      )}
      {loginStatus !== LOGIN_STATUS.NOT_LOGIN && (
        <>
          {loginStatus === LOGIN_STATUS.LOGIN_SUCCESS && (
            <motion.div
              key="signup_success_alert"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute right-4 top-0 max-w-25"
            >
              <LoginSuccess onClose={handleCloseLoginAlert} />
            </motion.div>
          )}
          {loginStatus === LOGIN_STATUS.LOGIN_FAIL && (
            <motion.div
              key="signup_fail_alert"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute right-4 top-0 max-w-25"
            >
              <LoginFail onClose={handleCloseLoginAlert} />
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default AlertMessage;
