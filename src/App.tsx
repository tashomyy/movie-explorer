import "./App.css";
import AppRoutes from "./Routes";
import { ThemeProvider } from "./store/ThemeContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p:4 lg:p-12 tw-px gap-4">
      <ToastContainer />
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
