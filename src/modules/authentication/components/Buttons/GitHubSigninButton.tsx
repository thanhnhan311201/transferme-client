import { Button } from "@mui/material";
import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";

import { GITHUB_CLIENT_ID } from "@/config";

const GitHubSigninButton: React.FC = () => {
  const handleSigninWithGitHub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  };

  return (
    <Button
      onClick={handleSigninWithGitHub}
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
  );
};

export default GitHubSigninButton;
