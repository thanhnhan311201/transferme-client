import TextField from "@mui/material/TextField";
import { Button, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { NavLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

const RegisterForm: React.FC<{
  email: string;
  onHandleEmail: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  username: string;
  onHandleUsername: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  password: string;
  onHandlePassword: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  confirmPassword: string;
  onHandleConfirmPassword: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onGoogleLogin: () => void;
  onSignup: () => void;
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
      <form className="flex flex-col px-6 py-8 rounded-xl shadow-lg mb-8">
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
            id="username"
            name="username"
            type="username"
            label="Username"
            value={props.username}
            onChange={props.onHandleUsername}
            variant="outlined"
            placeholder="E.g. TransferMe"
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
          <p className="text-xs">You can use letters, numbers & periods</p>
        </div>
        <div className="mb-4">
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={props.email}
            onChange={props.onHandleEmail}
            variant="outlined"
            placeholder="E.g. myemail@transferme.com"
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
        <div className="mb-4">
          <TextField
            id="password"
            label="Password"
            name="password"
            variant="outlined"
            value={props.password}
            onChange={props.onHandlePassword}
            type="password"
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
          <p className="text-xs">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>
        <div>
          <TextField
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm"
            value={props.confirmPassword}
            onChange={props.onHandleConfirmPassword}
            variant="outlined"
            type="password"
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
          <p className="text-xs">Password have to match</p>
        </div>
        <p className="text-xs my-6 text-center">
          By clicking Agree & Join, you agree to the TransferMe User Agreement,
          Privacy Policy, and Cookie Policy.
        </p>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "24px",
            height: "3.5rem",
          }}
          onClick={() => props.onSignup()}
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
