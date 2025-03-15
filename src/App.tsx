import "./App.css";
import AppRoutes from "./Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}

export default App;
