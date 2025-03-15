import { useAuth } from "../../store/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
