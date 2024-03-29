import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { IconContext } from "react-icons";
import CircularProgress from "@mui/material/CircularProgress";

import { LOGIN_STATUS } from "../../utils/auth.constant";
import { type IUserInputResult } from "../../hooks";

const LoginForm: React.FC<{
  email: IUserInputResult;
  password: IUserInputResult;
  onGoogleLogin: () => void;
  onGitHubLogin: () => void;
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  loginStatus: LOGIN_STATUS;
}> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-96 rounded-xl"
    >
      <form
        onSubmit={props.onLogin}
        className="flex flex-col px-6 py-8 rounded-xl shadow-lg mb-8 bg-white"
      >
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-4xl mb-1 font-bold">Sign in</h2>
            <p className="text-xs">Transfering faster than your love with ex</p>
          </div>
          <div className="flex">
            {props.loginStatus === LOGIN_STATUS.PROCESS_LOGIN && (
              <CircularProgress />
            )}
          </div>
        </div>
        <div className="mb-4">
          <TextField
            error={Boolean(props.email.errMessage)}
            id="email"
            name="email"
            label="Email"
            value={props.email.value}
            onChange={props.email.handleValueChange}
            onBlur={props.email.handleInputBlur}
            inputRef={props.email.inputRef}
            variant="outlined"
            type="email"
            helperText={props.email.errMessage ? props.email.errMessage : ""}
            sx={{
              fontSize: "1rem",
              marginBottom: "0.5rem",
              width: "100%",
              "& .MuiInputBase-input": {
                height: "3.5rem",
                padding: "0 1rem",
                display: "flex",
                alignItems: "center",
              },
            }}
            required
          />
        </div>
        <div className="mb-6">
          <TextField
            error={Boolean(props.password.errMessage)}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={props.password.value}
            onChange={props.password.handleValueChange}
            onBlur={props.password.handleInputBlur}
            inputRef={props.password.inputRef}
            helperText={
              props.password.errMessage ? props.password.errMessage : ""
            }
            sx={{
              fontSize: "1rem",
              marginBottom: "0.5rem",
              width: "100%",
              "& .MuiInputBase-input": {
                height: "3.5rem",
                padding: "0 1rem",
                display: "flex",
                alignItems: "center",
              },
            }}
            required
          />
        </div>
        <Button
          variant="contained"
          type="submit"
          sx={{
            textTransform: "none",
            marginBottom: "1.5rem",
            borderRadius: "24px",
            height: "3.5rem",
          }}
        >
          Sign in
        </Button>
        <p className="text-sm text-center">
          Forgotten your password?{" "}
          <NavLink className="text-blue-500 font-bold" to="/auth/reset">
            Reset password
          </NavLink>
        </p>
        <Divider
          sx={{
            margin: "1.375rem 0",
          }}
        >
          or
        </Divider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".75rem",
          }}
        >
          <Button
            onClick={() => props.onGoogleLogin()}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "24px",
              height: "3.5rem",
            }}
          >
            <IconContext.Provider
              value={{
                style: {
                  verticalAlign: "middle",
                  width: "1.5rem",
                  height: "1.5rem",
                  marginRight: "0.5rem",
                },
              }}
            >
              <FcGoogle /> Sign in with Google
            </IconContext.Provider>
          </Button>
          <Button
            onClick={() => props.onGitHubLogin()}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "24px",
              height: "3.5rem",
            }}
          >
            <IconContext.Provider
              value={{
                style: {
                  verticalAlign: "middle",
                  width: "1.5rem",
                  height: "1.5rem",
                  marginRight: "0.5rem",
                  color: "black",
                },
              }}
            >
              <BsGithub /> Sign in with GitHub
            </IconContext.Provider>
          </Button>
        </Box>
      </form>
      <p className="text-center text-base">
        New to TransferMe?
        <NavLink className="text-blue-500 font-bold" to="/auth/signup">
          {" "}
          Join now
        </NavLink>
      </p>
    </motion.div>
  );
};

export default LoginForm;
