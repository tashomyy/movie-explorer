import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-8 w-full">
      <Header classNameWidth="container" />
      <main className="h-full container">
        <Outlet />
      </main>
      <footer className="mt-auto">My App Footer</footer>
    </div>
  );
};

export default Layout;
