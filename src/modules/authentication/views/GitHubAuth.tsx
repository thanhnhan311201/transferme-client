import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BsGithub } from "react-icons/bs";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { motion } from "framer-motion";

import socketClient from "@/socket";
import { useAppDispatch } from "@/states";
import {
  setIdleStatusLogin,
  setIdleStatusSignup,
} from "../controller/auth.slice";

import AuthLayout from "../components/Layout";
import { IconContext } from "react-icons";
import { loginWithGithub } from "../controller/auth.action";

const GitHubAuth: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");

        if (codeParam) {
          const response = await dispatch(
            loginWithGithub({
              authCode: codeParam,
            })
          ).unwrap();

          console.log(response);
        }
      } catch (error) {}
    })();
  }, [dispatch]);

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col justify-center items-center gap-4 px-6 py-8 rounded-xl shadow-lg bg-white">
          <IconContext.Provider
            value={{
              style: {
                width: "2rem",
                height: "2rem",
              },
            }}
          >
            <BsGithub />
          </IconContext.Provider>
          <span className="text-xl font-medium">
            The login process is being processed.
          </span>
          <span className="text-base">
            You are being redirected to the home page, please do not leave the
            page.
          </span>
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="info" />
          </Box>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default GitHubAuth;
