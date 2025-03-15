import "./App.css";
import AppRoutes from "./Routes";
import { AuthProvider } from "./store/AuthContext";
import { MovieListsProvider } from "./store/MoviesListContext";
import { ThemeProvider } from "./store/ThemeContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ToastContainer />
      <ThemeProvider>
        <AuthProvider>
          <MovieListsProvider>
            <AppRoutes />
          </MovieListsProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
