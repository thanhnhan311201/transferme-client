import TextField from "@mui/material/TextField";
import { Button, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

import { type IUserInputResult } from "../hooks";

const LoginForm: React.FC<{
  email: IUserInputResult;
  password: IUserInputResult;
  onGoogleLogin: () => void;
  onLogin: () => void;
}> = (props) => {
  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="w-96"
    >
      <form className="flex flex-col px-6 py-8 rounded-xl shadow-lg mb-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-4xl mb-1 font-bold">Sign in</h2>
            <p className="text-xs">Transfering faster than your love with ex</p>
          </div>
          <div className="flex">
            <CircularProgress />
          </div>
        </div>
        <div className="mb-4">
          <TextField
            id="email"
            name="email"
            label="Email"
            value={props.email.value}
            onChange={props.email.handleValueChange}
            onBlur={props.email.handleInputBlur}
            variant="outlined"
            type="email"
            sx={{
              height: "3.5rem",
              fontSize: "1rem",
              marginBottom: "0.5rem",
              width: "100%",
              "& .MuiInputBase-root": {
                height: "100%",
                "& .MuiInputBase-input": {
                  padding: "0 1rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                },
              },
            }}
            required
          />
          <p className="text-xs">Please enter a valid email</p>
        </div>
        <div className="mb-6">
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={props.password.value}
            onChange={props.password.handleValueChange}
            onBlur={props.password.handleInputBlur}
            sx={{
              height: "3.5rem",
              fontSize: "1rem",
              marginBottom: "0.5rem",
              width: "100%",
              "& .MuiInputBase-root": {
                height: "100%",
                "& .MuiInputBase-input": {
                  height: "100%",
                  padding: "0 1rem",
                  display: "flex",
                  alignItems: "center",
                },
              },
            }}
            required
          />
          <p className="text-xs">Wrong password</p>
        </div>
        <Button
          variant="contained"
          onClick={props.onLogin}
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
