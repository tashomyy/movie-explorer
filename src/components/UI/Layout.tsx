import { Outlet } from "react-router-dom";
import Header from "./Header";
import ScrollTop from "./ScrollTop";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-12 lg:gap-28 w-full">
      <Header classNameWidth="container" />
      <main className="h-full container">
        <Outlet />
      </main>
      <footer className="mt-auto">My App Footer</footer>
      <ScrollTop />
    </div>
  );
};

export default Layout;
