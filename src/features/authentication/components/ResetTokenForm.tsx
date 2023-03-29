import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const ResetTokenForm: React.FC = () => {
  return (
    <div className="w-96">
      <form className="flex flex-col px-6 py-8 rounded-xl shadow-lg mb-8">
        <div className="mb-8">
          <h2 className="text-2xl mb-1 font-bold">
            We sent a code to your email
          </h2>
          <p className="text-xs">
            Enter the 6-digit verification code sent to your email.
          </p>
          <NavLink to="/auth/reset" className="text-blue-500 text-xs font-bold">
            Change
          </NavLink>
        </div>
        <div className="mb-2">
          <TextField
            id="reset-token"
            label="6 digit code"
            variant="outlined"
            type="text"
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
          <p className="text-xs">Code is wrong</p>
        </div>
        <NavLink to="/auth/reset" className="text-blue-500 font-bold">
          Resend code
        </NavLink>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            margin: "24px 0",
            borderRadius: "24px",
            height: "3.5rem",
          }}
        >
          Submit
        </Button>
        <p className="text-sm">
          If you don't see the email in your inbox, check your spam folder.
        </p>
      </form>
    </div>
  );
};

export default ResetTokenForm;
