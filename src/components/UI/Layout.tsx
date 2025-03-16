import { Outlet } from "react-router-dom";
import Header from "./Header";
import ScrollTop from "./ScrollTop";
import ButtonScrollTop from "./ButtonScrollTop";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 sm:gap-8 w-full">
      <Header classNameWidth="container" />
      <main className="h-full container">
        <Outlet />
      </main>
      <footer className="mt-auto text-primary-text container">
        &copy; 2025 tashomy
      </footer>
      <ScrollTop />
      <ButtonScrollTop />
    </div>
  );
};

export default Layout;
