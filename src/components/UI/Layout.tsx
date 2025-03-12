import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-8 w-full max-w-7xl">
      <Header />
      <nav>Navigation Bar</nav>
      <main className="h-full">
        <Outlet />
      </main>
      <footer className="mt-auto">My App Footer</footer>
    </div>
  );
};

export default Layout;
