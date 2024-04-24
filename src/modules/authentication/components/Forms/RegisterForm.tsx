import React from "react";
import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { type IUserInputResult } from "../../hooks";

import GoogleSigninButton from "../Buttons/GoogleSigninButton";
import FacebookSigninButton from "../Buttons/FacebookSigninButton";
import GitHubSigninButton from "../Buttons/GitHubSigninButton";

const RegisterForm: React.FC<{
  email: IUserInputResult;
  username: IUserInputResult;
  password: IUserInputResult;
  confirmPassword: IUserInputResult;
  onSignup: (e: React.FormEvent<HTMLFormElement>) => void;
  isSignupStatusLoading: boolean;
}> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-96 rounded-xl"
    >
      <form
        onSubmit={props.onSignup}
        className="flex flex-col px-6 py-8 mb-8 rounded-xl shadow-lg bg-white"
      >
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-4xl mb-1 font-bold">Sign up</h2>
            <p className="text-xs">Transfering faster than your love with ex</p>
          </div>
          <div className="flex">
            {props.isSignupStatusLoading && <CircularProgress />}
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
            onBlur={props.username.handleInputBlur}
            inputRef={props.username.inputRef}
            variant="outlined"
            placeholder="E.g. TransferMe"
            helperText={
              props.username.errMessage
                ? props.username.errMessage
                : "Username must be letters, numbers and no more than 30 characters."
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
            onBlur={props.email.handleInputBlur}
            inputRef={props.email.inputRef}
            variant="outlined"
            placeholder="E.g. myemail@transferme.com"
            helperText={
              props.email.errMessage
                ? props.email.errMessage
                : "You can use letters, numbers, underscore & periods."
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
            onBlur={props.password.handleInputBlur}
            inputRef={props.password.inputRef}
            type="password"
            helperText={
              props.password.errMessage
                ? props.password.errMessage
                : "Use 8 or more characters with a mix of letters, numbers & symbols."
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
            onBlur={props.confirmPassword.handleInputBlur}
            inputRef={props.confirmPassword.inputRef}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".75rem",
            marginBottom: "1.5rem",
          }}
        >
          <GoogleSigninButton />
          <FacebookSigninButton />
          <GitHubSigninButton />
        </Box>
        <p className="text-center text-base">
          Already on TransferMe?
          <NavLink className="text-blue-500 font-bold" to="/auth/signin">
            {" "}
            Sign in
          </NavLink>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
