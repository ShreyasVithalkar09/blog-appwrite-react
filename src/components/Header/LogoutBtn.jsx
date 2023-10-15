import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/features/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      type="button"
      className="rounded-md border border-black px-3 py-1 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-white hover:text-gray-900 hover:transition-all hover:ease-out hover:duration-500"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
