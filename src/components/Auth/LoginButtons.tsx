import { useAuth } from "../../store/AuthContext";

const LoginButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <button
      onClick={loginWithGoogle}
      className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
};

export default LoginButton;
