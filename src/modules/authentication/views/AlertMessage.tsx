import React from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/states";
import {
  setIdleStatusLogin,
  setIdleStatusSignup,
} from "../controller/auth.slice";

import { SignupSuccess } from "../components/AlertMessage";
import { SignupFail } from "../components/AlertMessage";
import { LoginFail } from "../components/AlertMessage";
import { LoginSuccess } from "../components/AlertMessage";

import { SIGNUP_STATUS, LOGIN_STATUS } from "../utils/auth.constant";

const AlertMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loginStatus } = useAppSelector((state) => state.auth);
  const { signupStatus } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleNavigateLoginPage = () => {
    navigate("/auth/login");
  };

  const handleCloseSignupAlert = () => {
    dispatch(setIdleStatusSignup());
  };

  const handleCloseLoginAlert = () => {
    dispatch(setIdleStatusLogin());
  };

  return (
    <>
      <AnimatePresence>
        {signupStatus !== SIGNUP_STATUS.IDLE && (
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
        {loginStatus !== LOGIN_STATUS.IDLE && (
          <>
            {loginStatus === LOGIN_STATUS.LOGIN_SUCCESS && (
              <motion.div
                key="login_success_alert"
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
                key="login_fail_alert"
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
      </AnimatePresence>
    </>
  );
};

export default AlertMessage;
