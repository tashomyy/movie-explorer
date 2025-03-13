import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const classNameWidth = "w-full max-w-7xl mx-auto";
  return (
    <div className="min-h-screen flex flex-col gap-8 w-full">
      <Header classNameWidth={classNameWidth} />
      <main className={`h-full ${classNameWidth}`}>
        <Outlet />
      </main>
      <footer className="mt-auto">My App Footer</footer>
    </div>
  );
};

export default Layout;
