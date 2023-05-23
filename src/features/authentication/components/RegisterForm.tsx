import TextField from "@mui/material/TextField";
import { Button, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

import { type IUserInputResult } from "../hooks";

const RegisterForm: React.FC<{
  email: IUserInputResult;
  username: IUserInputResult;
  password: IUserInputResult;
  confirmPassword: IUserInputResult;
  onGoogleLogin: () => void;
  onSignup: (e: React.FormEvent<HTMLFormElement>) => void;
}> = (props) => {
  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="w-96"
    >
      <form
        onSubmit={props.onSignup}
        className="flex flex-col px-6 py-8 rounded-xl shadow-lg mb-8"
      >
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-4xl mb-1 font-bold">Sign up</h2>
            <p className="text-xs">Transfering faster than your love with ex</p>
          </div>
          <div className="flex">
            <CircularProgress />
          </div>
        </div>
        <div className="mb-4">
          <TextField
            error={Boolean(props.username.errMessage)}
            id="username"
            name="username"
            type="username"
            label="Username"
            value={props.username.value}
            onChange={props.username.handleValueChange}
            variant="outlined"
            placeholder="E.g. TransferMe"
            helperText={
              props.username.errMessage ? props.username.errMessage : ""
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
          <p className="text-xs"></p>
        </div>
        <div className="mb-4">
          <TextField
            error={Boolean(props.email.errMessage)}
            id="email"
            name="email"
            type="email"
            label="Email"
            value={props.email.value}
            onChange={props.email.handleValueChange}
            variant="outlined"
            placeholder="E.g. myemail@transferme.com"
            helperText={
              props.email.errMessage
                ? props.email.errMessage
                : "You can use letters, numbers, underscore & periods "
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
        <div className="mb-4">
          <TextField
            error={Boolean(props.password.errMessage)}
            id="password"
            label="Password"
            name="password"
            variant="outlined"
            value={props.password.value}
            onChange={props.password.handleValueChange}
            type="password"
            helperText={
              props.password.errMessage
                ? props.password.errMessage
                : "Use 8 or more characters with a mix of letters, numbers & symbols"
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
        <div>
          <TextField
            error={Boolean(props.confirmPassword.errMessage)}
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm"
            value={props.confirmPassword.value}
            onChange={props.confirmPassword.handleValueChange}
            variant="outlined"
            type="password"
            helperText={
              props.confirmPassword.errMessage
                ? props.confirmPassword.errMessage
                : ""
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
          <p className="text-xs"></p>
        </div>
        <p className="text-xs my-6 text-center">
          By clicking Agree & Join, you agree to the TransferMe User Agreement,
          Privacy Policy, and Cookie Policy.
        </p>
        <Button
          type="submit"
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "24px",
            height: "3.5rem",
          }}
        >
          Agree & Join
        </Button>
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
            marginBottom: "1.5rem",
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
        <p className="text-center text-base">
          Already on TransferMe?
          <NavLink className="text-blue-500 font-bold" to="/auth/login">
            {" "}
            Sign in
          </NavLink>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
