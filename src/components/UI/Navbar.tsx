import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../lib/constants";
import { handleNavigationScroll } from "../../lib/helpers";
import { NavItem } from "../../lib/types";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const handleNavClick = (scrollTo?: string, path?: string, isLink = false) => {
    if (scrollTo) handleNavigationScroll(scrollTo, navigate);
    if (isLink && path) navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderNavItem = (
    { name, scrollTo, path, isLink }: NavItem,
    index: number
  ) => {
    return isLink ? (
      <li key={index}>
        <Link
          className="nav-item"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(undefined, path, true);
          }}
          to={path}
        >
          {name.toUpperCase()}
        </Link>
      </li>
    ) : (
      <li key={index}>
        <button className="nav-item" onClick={() => handleNavClick(scrollTo)}>
          {name.toUpperCase()}
        </button>
      </li>
    );
  };

  return (
    <nav className="container">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-auto"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <img src="/hamburger-menu.svg" alt="Mobile menu" />
        </button>

        {/* desktop */}
        <div className="hidden w-full lg:block" id="navbar-default">
          <ul className="flex flex-col mt-4 border border-gray-100 lg:flex-row lg:justify-between lg:gap-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            {NAV_LINKS.map(renderNavItem)}
          </ul>
        </div>

        {/* mobile */}
        {isMenuOpen && (
          <>
            {/* backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* menu */}
            <div
              className={`overflow-y-auto fixed top-0 z-50 right-0 h-full w-[360px] bg-primary transform transition-all duration-300 ease-in-out lg:hidden ${
                isMenuOpen ? "translate-x-0" : "translate-x-[360px]"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="sr-only">Close menu</span>✕
              </button>
              <ul className="flex flex-col p-4 space-y-4">
                {NAV_LINKS.map(renderNavItem)}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
