import { useDispatch } from "react-redux";
import { authActions } from "../../authentication/slice/authSlice";

const Transfer: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    document.cookie = `accessToken= ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;
    document.cookie = `userId=  ; expires= ${new Date(
      new Date().getTime()
    ).toUTCString()}`;
    dispatch(authActions.setUnauthenticated());
  };

  return (
    <div>
      <h1>This is Transfer page!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Transfer;
