import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

const NewPassForm: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-96  rounded-xl"
    >
      <form className="flex flex-col px-6 py-8 rounded-xl shadow-lg bg-white">
        <div className="mb-8">
          <h2 className="text-3xl mb-1 font-bold">Choose a new password</h2>
          <p className="text-xs">
            Create a new password that is at least 8 characters long
          </p>
        </div>
        <div className="mb-4">
          <TextField
            id="newpass"
            name="newpass"
            label="New password"
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
                  padding: "0 1rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                },
              },
            }}
            required
          />
          <p className="text-xs">Password must have 8 characters</p>
          <p className="text-xs">Number and sepecial character</p>
        </div>
        <div className="mb-6">
          <TextField
            id="confirm-password"
            label="Retype new password"
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
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "24px",
            height: "3.5rem",
          }}
        >
          Submit
        </Button>
      </form>
    </motion.div>
  );
};

export default NewPassForm;
