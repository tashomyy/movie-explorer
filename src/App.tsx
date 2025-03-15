import "./App.css";
import AppRoutes from "./Routes";
import AppProviders from "./store/AppProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ToastContainer />
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </div>
  );
}

export default App;
