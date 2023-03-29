import { useDispatch } from "react-redux";
import { authActions } from "../../authentication/slice/authSlice";

const Transfer: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.setUnauthenticated());
  };

  return (
    <div>
      <h1>This is Transfer page!</h1>
      <button>Logout</button>
    </div>
  );
};

export default Transfer;
